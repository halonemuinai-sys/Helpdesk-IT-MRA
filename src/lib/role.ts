export type UserRole = 'admin' | 'support' | 'staff';

export const VALID_ROLES: UserRole[] = ['admin', 'support', 'staff'];

export function toRole(raw: string | undefined | null): UserRole {
  if (raw && VALID_ROLES.includes(raw as UserRole)) return raw as UserRole;
  return 'support'; // Default role
}

// Home redirect per role
export const ROLE_HOME: Record<UserRole, string> = {
  admin:   '/',
  support: '/',
  staff:   '/input',
};

// Route prefix → roles allowed
export const ROUTE_RULES: { prefix: string; allowed: UserRole[] }[] = [
  { prefix: '/reports',     allowed: ['admin'] },
  { prefix: '/tickets',     allowed: ['admin', 'support'] },
  { prefix: '/input',       allowed: ['admin', 'support', 'staff'] },
  { prefix: '/master-data', allowed: ['admin'] },
  { prefix: '/employees',   allowed: ['admin'] },
];

// Sidebar group label → roles that can see it
export const GROUP_ACCESS: Record<string, UserRole[]> = {
  'OVERVIEW': ['admin', 'support'],
  'TICKETS':  ['admin', 'support'],
  'REPORTS':  ['admin'],
  'ADMIN':    ['admin'],
};

export function filterMenuGroups<T extends { label: string }>(
  groups: T[],
  role: UserRole,
): T[] {
  return groups.filter(g => (GROUP_ACCESS[g.label] ?? ['admin']).includes(role));
}

export function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .filter(Boolean)
    .map(w => w[0].toUpperCase())
    .join('')
    .slice(0, 2);
}
