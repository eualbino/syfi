import { RequireAuth } from "@/data/AuthUser/require-auth";
import type { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <div>{children}</div>
    </RequireAuth>
  );
}
