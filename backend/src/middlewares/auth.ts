import type { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function AuthMiddlewares(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(404).json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  if (!process.env.JWT_SECRET) {
    return res.json("error: não foi encontrado a cahve secreta JWT");
  }

  const secret = process.env.JWT_SECRET;

  try {
    const decoded = verify(token, secret) as { userId: string; };
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token not provided" });
  }
}
