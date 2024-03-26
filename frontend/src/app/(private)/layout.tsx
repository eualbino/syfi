import { RequireAuth } from "@/data/AuthUser/require-auth";
import { ThemeProvider } from "@/provider/theme-provider";
import type { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div>{children}</div>
      </ThemeProvider>
    </RequireAuth>
  );
}
