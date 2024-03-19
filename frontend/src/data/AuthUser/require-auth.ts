"use client"
import { useRouter } from "next/navigation";
import {useEffect, type ReactNode, useState } from "react";

export function RequireAuth({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter();

  useEffect(() => {
    const tokens = localStorage.getItem("authToken");
    setToken(tokens)
    if (!tokens) {
      router.push("/");
    }
  }, [router]);

  return token ? children : null;
}