import type { Request as ExpressRequest, Response } from "express";
import { prisma } from "../../lib/prisma";

interface Request extends ExpressRequest {
  userId?: string;
}

export async function getItemsPagination(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const q = typeof req.query.q === "string" ? req.query.q : undefined;

  const userId = req.userId;

  try {
    const listBuy = q
      ? await prisma.listBuy.findMany({
          where: {
            AND: [
              {
                name: {
                  contains: q,
                },
              },
              {
                userId: userId,
              },
            ],
          },
        })
      : await prisma.listBuy.findMany({
          where: {
            userId: userId,
          },
          skip: skip,
          take: take,
        });

    const totalItems = await prisma.listBuy.count({
      where: {
        userId: userId,
      },
    });

    res.json({ listBuy, totalItems });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while retrieving data" });
  }
}
