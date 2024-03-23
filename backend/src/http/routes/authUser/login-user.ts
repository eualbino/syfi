import { compare } from "bcrypt";
import { prisma } from "../../../lib/prisma";
import type { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { generateRefreshToken } from "../../../provider/generate-refreshtoken";

dotenv.config();

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  const validPassword = await compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  if (!process.env.JWT_SECRET) {
    return res.json("error: não foi encontrado a cahve secreta JWT");
  }
  
  const secret = process.env.JWT_SECRET
  const token = sign({ userId: user.id }, secret, {
    expiresIn: "1m",
  });
  const refreshToken = await generateRefreshToken(user.id)
  res.json({ token, refreshToken });
}
