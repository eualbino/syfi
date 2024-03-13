import { sign } from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import type { Request, Response } from "express";

export async function refreshToken(req: Request, res: Response) {
  const { refresh_token } = req.body;
  const refreshToken = await prisma.refreshToken.findFirst({
    where: {
      id: refresh_token,
    },
  });
  if (!refreshToken) {
    throw new Error("Refresh token invalid");
  }
  if (!process.env.JWT_SECRET) {
    return res.json("error: não foi encontrado a cahve secreta JWT");
  }
  const secret_refresh = process.env.JWT_SECRET;

  const token = sign({}, secret_refresh, { expiresIn: "7d" });

  return res.json(token);
}
