import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse({ NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL })
if(!parsedEnv.success){
  console.error(
    "Invalid environment variables",
    parsedEnv.error.flatten().fieldErrors,
  )
  throw new Error("Invalid environment variables")
}

export const env = parsedEnv.data
