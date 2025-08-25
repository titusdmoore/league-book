import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User } from "@/payload-types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isSuperAdmin(user: User): boolean {
  if (!user || (user.roles === undefined || user.roles === null)) return false;

  return user.roles!.includes('super_admin');
}
