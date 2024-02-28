import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InsertPurchase() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black text-white dark:bg-white dark:text-black">Inserir</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Inserir o produto</DialogTitle>
          <DialogDescription>
            Insira o nome do produto que deseja adicionar a lista!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3 border-2 border-black dark:border-none dark:bg-zinc-800" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Inserir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
