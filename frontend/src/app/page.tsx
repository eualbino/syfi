"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Check,
  MoonIcon,
  Pencil,
  Search,
  SunIcon,
  Trash2,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { setTheme } = useTheme();
  return (
    <div>
      <header className="flex justify-end pr-8 pt-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex justify-center items-center h-[70vh] flex-col">
        <div className="min-w-[40%]">
          <div className="flex items-center justify-start gap-3 py-8 ring-zinc-300">
            <Search className="w-5 h-4 text-sm absolute ml-2 text-zinc-600" />
            <Input
              className=" placeholder:text-zinc-500  dark:border-none dark:bg-zinc-900 border-2 border-black rounded-xl max-w-80 text-sm pl-9"
              placeholder="Pesquisar..."
            />
          </div>
          <div className="">
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
                <TableRow className="border-b-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                  <TableCell className="pl-5">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="max-w-60 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    Sabão em Pó Omo Lavagem Perfeita 800g
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
                <TableRow className="border-b-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                  <TableCell className="pl-5">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="max-w-60 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    Sabão em Pó Omo Lavagem Perfeita 800g
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
                <TableRow className="border-b-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800">
                  <TableCell className="pl-5">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="max-w-60 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    Sabão em Pó Omo Lavagem Perfeita 800g
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
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
