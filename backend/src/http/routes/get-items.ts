import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function getItemsPagination(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const q = typeof req.query.q === "string" ? req.query.q : undefined;

  try {
    const listBuy = q
      ? await prisma.listBuy.findMany({
          where: {
            name: {
              contains: q,
            },
          },
        })
      : await prisma.listBuy.findMany({
          skip: skip,
          take: take,
        });

    const totalItems = await prisma.listBuy.count();

    res.json({ listBuy, totalItems });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
}
