"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { purchasePost } from "@/data/purchase-data";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const formInserirSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Insira a receita ou despesa!",
    })
    .max(255, {
      message: "Tem que ser menor que 255 letras!",
    }),
});

type FormInserirSchema = z.infer<typeof formInserirSchema>;

export function InsertPurchase({ page, q }: { page: number, q: string }) {
  const { handleSubmit, register } = useForm<FormInserirSchema>({
    resolver: zodResolver(formInserirSchema),
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: postPurchase } = useMutation({
    mutationFn: purchasePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase", page, q] });
    },
  });

  async function handleInserirPurchase(data: FormInserirSchema) {
    await postPurchase(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-black text-white dark:bg-white dark:text-black"
        >
          Inserir
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(handleInserirPurchase)}>
          <DialogHeader>
            <DialogTitle>Inserir o produto</DialogTitle>
            <DialogDescription>
              Insira o nome do produto que deseja adicionar a lista!
            </DialogDescription>
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
              <Button type="submit">Inserir</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
