import type { User } from "@/types";

const STORAGE_KEY = "infeira_user";

export function getUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function setUser(name: string): void {
  const user: User = {
    name,
    completedOnboarding: true,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function hasCompletedOnboarding(): boolean {
  const user = getUser();
  return user?.completedOnboarding ?? false;
}

export function clearUser(): void {
  localStorage.removeItem(STORAGE_KEY);
}

