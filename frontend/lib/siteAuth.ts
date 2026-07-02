export type AppRole = "sender" | "receiver";

export const SESSION_AUTH_KEYS: Record<AppRole, string> = {
  sender: "site-auth-sender",
  receiver: "site-auth-receiver",
};

export function getRoleFromPath(pathname: string): AppRole {
  if (pathname.startsWith("/receiver") || pathname.startsWith("/reciver")) {
    return "receiver";
  }
  return "sender";
}

export function getSessionAuthKey(role: AppRole): string {
  return SESSION_AUTH_KEYS[role];
}
