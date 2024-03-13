import { prisma } from "../lib/prisma";
import dayjs from 'dayjs'
export async function generateRefreshToken(userId: string) {
  const expiresIn = dayjs().add(15, "second").unix()
  const generateRefreshToken = await prisma.refreshToken.create({
    data: {
      userId,
      expiresIn
    }
  })
  return generateRefreshToken
}