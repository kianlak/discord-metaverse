const ensuredUsers = new Set<string>();

export function addEnsuredUser(userId: string): void {
  ensuredUsers.add(userId);
}

export function isUserEnsured(userId: string): boolean {
  return ensuredUsers.has(userId);
}