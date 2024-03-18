import { prisma } from "../lib/prisma";
import dayjs from "dayjs";

export async function generateRefreshToken(userId: string) {
  const expiresIn = dayjs().add(15, "second").unix();

  const existingToken = await prisma.refreshToken.findUnique({
    where: { userId },
  });

  if (existingToken) {
    const updatedToken = await prisma.refreshToken.update({
      where: { userId },
      data: { expiresIn },
    });
    return updatedToken;
  }
  const newToken = await prisma.refreshToken.create({
    data: { userId, expiresIn },
  });
  return newToken;
}
