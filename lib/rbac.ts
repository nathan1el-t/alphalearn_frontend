import { apiFetch } from "@/lib/api";
import { redirect } from "next/navigation";

/**
 * Server-side RBAC utilities
 * used in Server Components (layouts, pages) for route protection
 */

export type UserRole = "ADMIN" | "CONTRIBUTOR" | "LEARNER";
export type PublicRouteKey =
  | "concepts-list"
  | "concept-detail"
  | "lessons-list"
  | "lesson-detail";

interface RoleResponse {
  role: UserRole;
}

/**
 * Get the current user's role from the backend
 * Throws error if not authenticated (handled by parent protected layout)
 */
export async function getUserRole(): Promise<UserRole> {
  const data = await apiFetch<RoleResponse>("/me/role");
  console.log("[RBAC] Fetched user role:", data.role);
  return data.role;
}

export function getAdminEquivalentPath(
  route: PublicRouteKey,
  params?: { id?: string | number }
): string {
  switch (route) {
    case "concepts-list":
      return "/admin/concepts";
    case "concept-detail":
      return `/admin/concepts/${params?.id ?? ""}`;
    case "lessons-list":
      return "/admin/lessons";
    case "lesson-detail":
      return `/admin/lessons/${params?.id ?? ""}`;
    default: {
      const exhaustiveCheck: never = route;
      return exhaustiveCheck;
    }
  }
}

export async function redirectAdminFromPublicRoute(
  route: PublicRouteKey,
  params?: { id?: string | number }
): Promise<void> {
  const role = await getUserRole();

  if (role === "ADMIN") {
    redirect(getAdminEquivalentPath(route, params));
  }
}

/**
 * Require specific role to access a route
 * Redirects to home if user doesn't have required role
 */
export async function requireRole(allowedRoles: UserRole | UserRole[], redirectTo: string = "/"): Promise<void> {
  try {
    const userRole = await getUserRole();
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    
    console.log("[RBAC] Checking role:", { userRole, allowedRoles, isAllowed: roles.includes(userRole) });
    
    if (!roles.includes(userRole)) {
      console.log("[RBAC] Access denied. Redirecting to:", redirectTo);
      redirect(redirectTo);
    }
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("[RBAC] Error checking role:", error);
    redirect(redirectTo);
  }
}

/**
 * Check if user has admin role
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const role = await getUserRole();
    return role === "ADMIN";
  } catch {
    return false;
  }
}

/**
 * Check if user has contributor role or higher
 */
export async function isContributor(): Promise<boolean> {
  try {
    const role = await getUserRole();
    return role === "ADMIN" || role === "CONTRIBUTOR";
  } catch {
    return false;
  }
}
