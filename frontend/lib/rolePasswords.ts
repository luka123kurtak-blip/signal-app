import type { AppRole } from "./siteAuth";

export const ROLE_PASSWORDS: Record<AppRole, string> = {
  sender: "arktik100%",
  receiver: "arktiktech100%",
};

export function getRolePassword(role: AppRole): string {
  return ROLE_PASSWORDS[role];
}
