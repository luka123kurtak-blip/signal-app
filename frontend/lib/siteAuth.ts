export const AUTH_COOKIE = "site-auth";

export async function getSiteAuthToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`signal-app:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
