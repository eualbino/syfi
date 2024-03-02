import { purchasePutComprado } from "@/data/purchase-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";

export function NotCompradoButton({ id, page, comprado, q }: { id: number; page: number, comprado: boolean, q: string }) {
  const queryClient = useQueryClient();

  const { mutateAsync: notPurchaseItem } = useMutation({
    mutationFn: () => purchasePutComprado(id, {comprado: false}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase", page, q] });
    },
  });

  function handleNotPurchaseItem(){
    return notPurchaseItem()
  }

  return(
    <button type="submit" onClick={handleNotPurchaseItem} className={`${!comprado ? "text-zinc-400" : "text-red-400"}`}>
      <X />
    </button>
  )
}
