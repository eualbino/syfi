import { purchasePut } from "@/data/purchase-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";

export function CompradoButton({ id, page }: { id: number; page: number }) {
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
    <button type="submit" onClick={handlePurchaseItem}>
      <Check/>
    </button>
  )
}
