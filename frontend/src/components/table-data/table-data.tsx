"use client";
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
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

export function TableData() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState<number | null>(null);
  const { getPurchase } = usePurchase(page);
  const total = getPurchase?.totalItems;
  
  useEffect(() => {
    if (total !== undefined) {
      const maxPages = Math.ceil(total / 10);
      setMaxPage(maxPages);
    }
  }, [total]);

  function handlePreviousPage() {
    if (page > 1) {
      setPage(page - 1);
    } else {
      return null;
    }
  }

  function handleNextPage() {
    if (maxPage !== null) {
      if (page < maxPage) {
        setPage(page + 1);
      }else{
        return null
      }
    }
  }

  return (
    <div>
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
          {getPurchase?.listBuy?.map((purchaseData) => {
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
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                isActive={page > 1}
                onClick={handlePreviousPage}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
