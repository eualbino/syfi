"use client"
import { usePurchase } from "@/data/purchase-data";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Pencil, Trash2, X } from "lucide-react";

export function TableData() {
  const { getPurchase } = usePurchase();
  return (
    <div >
      <Table>
        <TableHeader>
          <TableRow className="text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <TableHead className="pl-5">
              <Checkbox />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Editar / Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-semibold">
          {getPurchase?.map((purchaseData) => {
            return (
              <TableRow
                className="border-b-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                key={purchaseData.id}
              >
                <TableCell className="pl-5">
                  <Checkbox />
                </TableCell>
                <TableCell className="max-w-60 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {purchaseData.name}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Check /> / <X />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Pencil /> / <Trash2 />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
