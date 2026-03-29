// lib/token.ts

export function validateToken(header?: string | null): string {
  if (!header) throw new Error("Missing Authorization header");

  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) throw new Error("Invalid Authorization format");

  // basic decode
  const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

  // exp check
  if (payload.exp * 1000 < Date.now()) {
    throw new Error("Token expired");
  }

  // issuer check (Microsoft only)
  if (!payload.iss?.includes("https://login.microsoftonline.com")) {
    throw new Error("Invalid token issuer");
  }

  return token;
}