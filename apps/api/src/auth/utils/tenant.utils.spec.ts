// Simple utility functions to test multi-tenant logic
import { Role } from '@prisma/client';

export function canUserAccessCompany(
  userRole: Role,
  userCompanyId: number | null,
  targetCompanyId: number | null,
): boolean {
  // SUPER_ADMIN can access everything
  if (userRole === Role.SUPER_ADMIN) {
    return true;
  }

  // CLIENT can access everything (not company-specific)
  if (userRole === Role.CLIENT) {
    return true;
  }

  // If no target company specified, allow access
  if (!targetCompanyId) {
    return true;
  }

  // Company users must have a companyId
  if (!userCompanyId) {
    return false;
  }

  // Must belong to same company
  return userCompanyId === targetCompanyId;
}

export function isValidCompanyRole(role: Role): boolean {
  const companyRoles: Role[] = [
    Role.ADMIN,
    Role.FLEET_MANAGER,
    Role.AMBULANCE_DRIVER,
  ];
  return companyRoles.includes(role);
}

describe('Tenant Utils', () => {
  describe('canUserAccessCompany', () => {
    it('should allow SUPER_ADMIN to access any company', () => {
      expect(canUserAccessCompany(Role.SUPER_ADMIN, null, 1)).toBe(true);
      expect(canUserAccessCompany(Role.SUPER_ADMIN, 1, 2)).toBe(true);
    });

    it('should allow CLIENT to access without company restriction', () => {
      expect(canUserAccessCompany(Role.CLIENT, null, 1)).toBe(true);
      expect(canUserAccessCompany(Role.CLIENT, null, null)).toBe(true);
    });

    it('should allow access when no target company specified', () => {
      expect(canUserAccessCompany(Role.ADMIN, 1, null)).toBe(true);
      expect(canUserAccessCompany(Role.FLEET_MANAGER, 2, null)).toBe(true);
    });

    it('should allow company user to access same company', () => {
      expect(canUserAccessCompany(Role.ADMIN, 1, 1)).toBe(true);
      expect(canUserAccessCompany(Role.FLEET_MANAGER, 2, 2)).toBe(true);
    });

    it('should deny company user access to different company', () => {
      expect(canUserAccessCompany(Role.ADMIN, 1, 2)).toBe(false);
      expect(canUserAccessCompany(Role.FLEET_MANAGER, 2, 1)).toBe(false);
    });

    it('should deny access when company user has no companyId', () => {
      expect(canUserAccessCompany(Role.ADMIN, null, 1)).toBe(false);
      expect(canUserAccessCompany(Role.FLEET_MANAGER, null, 1)).toBe(false);
    });
  });

  describe('isValidCompanyRole', () => {
    it('should allow valid company roles', () => {
      expect(isValidCompanyRole(Role.ADMIN)).toBe(true);
      expect(isValidCompanyRole(Role.FLEET_MANAGER)).toBe(true);
      expect(isValidCompanyRole(Role.AMBULANCE_DRIVER)).toBe(true);
    });

    it('should reject invalid company roles', () => {
      expect(isValidCompanyRole(Role.CLIENT)).toBe(false);
      expect(isValidCompanyRole(Role.SUPER_ADMIN)).toBe(false);
    });
  });
});
