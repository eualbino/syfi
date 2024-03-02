import { purchaseDelete } from "@/data/purchase-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

export function DeleteButton({ id, page, q }: { id: number; page: number; q: string }) {
  const queryClient = useQueryClient();

  const { mutateAsync: deletePurchase } = useMutation({
    mutationFn: purchaseDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase", page, q] });
    },
  });

  function handleDeleteButton() {
    return deletePurchase(id);
  }

  return (
    <button type="submit" onClick={handleDeleteButton}>
      <Trash2 />
    </button>
  );
}
