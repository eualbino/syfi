import { prisma } from "../../lib/prisma";
import type { Request, Response } from "express"

export async function putStatusItem(req: Request, res: Response) {
  const { comprado } = req.body;
  const { id } = req.params;
  try {
    const post = await prisma.listBuy.update({
      where: { id: Number(id) },
      data: {
        comprado,
      },
    });
    res.json(post);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
}

export async function putNameItem(req: Request, res: Response){
  const { name } = req.body;
  const { id } = req.params;
  try {
    const post = await prisma.listBuy.update({
      where: { id: Number(id) },
      data: {
        name,
      },
    });
    res.json(post);
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
}
