"use client";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "@/lib/msalClient";

export default function MSALProvider({ children }) {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
