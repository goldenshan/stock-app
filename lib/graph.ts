// lib/graph.ts

export async function graphFetch(token: string, url: string, options: any = {}) {
  const res = await fetch(`https://graph.microsoft.com/v1.0${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error("Graph error: " + errText);
  }

  return res.json();
}