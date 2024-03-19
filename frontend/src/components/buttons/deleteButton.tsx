import { purchaseDelete } from "@/data/purchase-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export function DeleteButton({
  id,
  page,
  q,
  selectedIds,
  setSelectedIds,
  setIsAllSelected,
}: {
  id: number;
  page: number;
  q: string;
  selectedIds: Array<number>;
  setSelectedIds: Dispatch<SetStateAction<Array<number>>>;
  setIsAllSelected: (value: boolean) => void; 
}) {
  const queryClient = useQueryClient();

  const { mutateAsync: deletePurchase } = useMutation({
    mutationFn: purchaseDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchase", page, q] });
    },
  });

  async function handleDeleteSelected() {
    if (selectedIds.length >= 1) {
      for (const id of selectedIds) {
        await deletePurchase(id);
      }
    } else {
      await deletePurchase(id);
    }
    setSelectedIds([]);
    setIsAllSelected(false);
  }

  return (
    <button type="submit" onClick={handleDeleteSelected}>
      <Trash2 />
    </button>
  );
}
