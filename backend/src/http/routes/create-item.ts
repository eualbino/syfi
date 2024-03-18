import { prisma } from "../../lib/prisma";
import type { Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function createItemListBuy(req: Request, res: Response) {
  const { name } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const result = await prisma.listBuy.create({
    data: {
      name,
      user: {
        connect: {
          id: userId
        }
      }
    },
    
  });
  res.json(result);
}
