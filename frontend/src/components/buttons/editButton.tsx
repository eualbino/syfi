import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { purchasePutName } from "@/data/purchase-data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaPutName = z.object({
  name: z.string(),
});

type SchemaPutName = z.infer<typeof schemaPutName>;

export function EditButton({
  id,
  page,
  q,
}: {
  page: number;
  id: number;
  q: string;
}) {
  const queryClient = useQueryClient();
  const { handleSubmit, register } = useForm<SchemaPutName>({
    resolver: zodResolver(schemaPutName),
    defaultValues: {
      name: "",
    },
  });

  const { mutateAsync: putPurchaseName } = useMutation({
    mutationFn: ({name}: SchemaPutName) => purchasePutName(id, {name}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase", page, q] });
    },
  });

  async function handleEditPurchase(data: SchemaPutName) {
    await putPurchaseName(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="">
          <Pencil />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleEditPurchase)}>
          <DialogHeader>
            <DialogTitle>Mude o nome do produto</DialogTitle>
            <DialogDescription>Edite o nome do produto!</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3 border-2 border-black dark:border-none dark:bg-zinc-800"
                {...register("name")}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button type="submit">Editar</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
