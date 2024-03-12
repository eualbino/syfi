import { prisma } from "../../lib/prisma";
import type { Request, Response } from "express";

export async function createItemListBuy(req: Request, res: Response) {
  const { name } = req.body;
  const result = await prisma.listBuy.create({
    data: {
      name,
    },
  });
  res.json(result);
}
