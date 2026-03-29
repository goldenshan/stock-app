// lib/msalClient.ts
import { PublicClientApplication, BrowserCacheLocation } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AAD_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AAD_TENANT_ID}`,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: true,
  },
};

export const loginRequest = {
  scopes: ["User.Read", "Files.ReadWrite"],
};

export const msalInstance = new PublicClientApplication(msalConfig);