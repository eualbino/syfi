"use client";
import { purchaseDelete, purchaseGet } from "@/data/purchase-data";
import { Checkbox } from "../ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { DeleteButton } from "../buttons/deleteButton";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CompradoButton } from "../buttons/compradoButton";
import { NotCompradoButton } from "../buttons/notCompradoButton";
import { EditButton } from "../buttons/editButton";

export function TableData({
  page,
  setPage,
  q,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  q: string;
}) {
  const [maxPage, setMaxPage] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const { data: getPurchase } = useQuery({
    queryKey: ["purchase", page, q],
    queryFn: () => purchaseGet(page, q),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

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
      } else {
        return null;
      }
    }
  }

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        getPurchase?.listBuy?.map((purchaseData) => purchaseData.id) || []
      );
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleSelectRow = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <TableHead className="pl-5">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
              />
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
                  <Checkbox
                    checked={selectedIds.includes(purchaseData.id)}
                    onCheckedChange={() => {
                      handleSelectRow(purchaseData.id);
                    }}
                  />
                </TableCell>
                <TableCell
                  className={`max-w-60 overflow-hidden overflow-ellipsis whitespace-nowrap ${
                    purchaseData.comprado === true
                      ? "line-through text-zinc-400"
                      : null
                  }`}
                >
                  {purchaseData.name}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <CompradoButton
                      id={purchaseData.id}
                      page={page}
                      comprado={purchaseData.comprado}
                      q={q}
                    />{" "}
                    /{" "}
                    <NotCompradoButton
                      id={purchaseData.id}
                      page={page}
                      comprado={purchaseData.comprado}
                      q={q}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 pl-2">
                    <EditButton
                      id={purchaseData.id}
                      page={page}
                      q={q}
                      placeholderName={purchaseData.name}
                    />{" "}
                    /{" "}
                    <DeleteButton
                      id={purchaseData.id}
                      page={page}
                      q={q}
                      selectedIds={selectedIds}
                      setSelectedIds={setSelectedIds}
                      setIsAllSelected={setIsAllSelected}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-3 xs:mr-2">
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
              <PaginationNext
                onClick={handleNextPage}
                isActive={page < (maxPage ?? 0)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
