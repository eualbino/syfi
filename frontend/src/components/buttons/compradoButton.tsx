import { purchasePutComprado } from "@/data/purchase-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";

export function CompradoButton({
  id,
  page,
  comprado,
  q,
}: {
  id: number;
  page: number;
  comprado: boolean;
  q: string;
}) {
  const queryClient = useQueryClient();

  const { mutateAsync: purchaseItem } = useMutation({
    mutationFn: () => purchasePutComprado(id, { comprado: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase", page, q] });
    },
  });

  function handlePurchaseItem() {
    return purchaseItem();
  }

  return (
    <button
      type="submit"
      onClick={handlePurchaseItem}
      disabled={comprado === true}
      className={`${comprado ? "text-zinc-400" : "text-green-400"}`}
    >
      <Check />
    </button>
  );
}
