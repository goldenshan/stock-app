"use client";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/lib/msalClient";

export default function MSALProvider({ children }: { children: React.ReactNode }) {
  return (
    <MsalProvider instance={msalInstance}>
      {children}
    </MsalProvider>
  );
}
