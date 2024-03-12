import type {Request, Response} from "express"
import { prisma } from "../../lib/prisma";

export async function deleteItem(req: Request, res: Response){
  const { id } = req.params;
  const listBuy = await prisma.listBuy.findUnique({
    where: { id: Number(id) },
  });

  if (!listBuy) {
    return res.status(404).json({ error: "Record not found" });
  }

  const post = await prisma.listBuy.delete({ where: { id: Number(id) } });
  res.json(post);
}