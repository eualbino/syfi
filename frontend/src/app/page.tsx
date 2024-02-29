"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SetTheme } from "@/components/dropdown-theme/set-theme";
import { InsertPurchase } from "@/components/dialog-insert/insert-purchase";
import { TableData } from "@/components/table-data/table-data";

export default function HomePage() {
  const [page, setPage] = React.useState(1);
  return (
    <div>
      <SetTheme />
      <div className="flex justify-center items-center h-[70vh] flex-col">
        <div className="min-w-[40%]">
          <div className="flex justify-between gap-3 py-8 ring-zinc-300 ">
            <div className="flex items-center">
              <Search className="w-5 h-4 text-sm absolute ml-2 text-zinc-600" />
              <Input
                className=" placeholder:text-zinc-500  dark:border-none dark:bg-zinc-900 border-2 border-black rounded-xl max-w-80 text-sm pl-9"
                placeholder="Pesquisar..."
              />
            </div>
            <div>
              <InsertPurchase page={page} />
            </div>
          </div>
          <TableData page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}
