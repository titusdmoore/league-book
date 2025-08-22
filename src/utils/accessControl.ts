import { User } from "@/payload-types";

export function isSuperAdmin(user: User): boolean {
  if (!user || (user.roles === undefined || user.roles === null)) return false;

  return user.roles!.includes('super_admin');
}
