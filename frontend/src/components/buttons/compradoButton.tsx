import { purchasePut } from "@/data/purchase-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";

export function CompradoButton({ id, page, comprado }: { id: number; page: number, comprado: boolean }) {
  const queryClient = useQueryClient();

  const { mutateAsync: purchaseItem } = useMutation({
    mutationFn: () => purchasePut(id, {comprado: true}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase", page] });
    },
  });

  function handlePurchaseItem(){
    return purchaseItem()
  }

  return(
    <button type="submit" onClick={handlePurchaseItem} disabled={comprado === true} className={`${comprado ? "text-zinc-400" : "text-green-400"}`}> 
      <Check/>
    </button>
  )
}
