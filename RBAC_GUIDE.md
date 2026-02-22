# Role-Based Access Control (RBAC) Guide

This project uses a simple, scalable RBAC system supporting three roles:
- **ADMIN**: Full system access
- **CONTRIBUTOR**: Can create and manage content
- **LEARNER**: Basic user access

## Architecture

The role is fetched once on authentication and stored in **AuthContext** for optimal performance. This eliminates redundant API calls.

**Flow:**
1. User logs in → AuthContext fetches role from `/me/role`
2. Role stored in context alongside user/session
3. All components access role from context (no additional fetches)

## Client-Side Role Access

Use `userRole` from AuthContext in any Client Component:

### Example: Navbar with Role-Based Navigation

```tsx
"use client"
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, userRole, isLoading } = useAuth();

  return (
    <>
      {userRole === "ADMIN" && <AdminNav />}
      {(userRole === "ADMIN" || userRole === "CONTRIBUTOR") && <CreateButton />}
      <span>Role: {userRole}</span>
    </>
  );
}
```

### All Components Get Role for Free

No need to fetch role separately - it's already in context:

```tsx
const { userRole } = useAuth();

// userRole is "ADMIN" | "CONTRIBUTOR" | "LEARNER" | null
```

### Example: Admin-Only Routes

```tsx
// app/(protected)/(admin)/admin/layout.tsx
import { requireRole } from "@/lib/rbac";

export default async function AdminLayout({ children }) {
  await requireRole("ADMIN");
  return <>{children}</>;
}
```

### Example: Contributor+ Routes

```tsx
// app/(protected)/(contributor)/create/layout.tsx
import { requireRole } from "@/lib/rbac";

export default async function ContributorLayout({ children }) {
  // Allow both ADMIN and CONTRIBUTOR roles
  await requireRole(["ADMIN", "CONTRIBUTOR"]);
  return <>{children}</>;
}
```

### Available Server Functions

```typescript
import { requireRole, getUserRole, isAdmin, isContributor } from "@/lib/rbac";

// Require specific role(s), redirect if unauthorized
await requireRole("ADMIN");
await requireRole(["ADMIN", "CONTRIBUTOR"], "/unauthorized");

// Get user's role
const role = await getUserRole(); // Returns "ADMIN" | "CONTRIBUTOR" | "LEARNER"

// Check specific roles
const admin = await isAdmin(); // true if ADMIN
const contributor = await isContributor(); // true if ADMIN or CONTRIBUTOR
```

## Client-Side UI Visibility

Use `useAuth()` hook in Client Components for conditional rendering:

### Example: Role-Based Navigation

```tsx
"use client"
import { useAuth } from "@/context/AuthContext";

export function MyComponent() {
  const { userRole, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {userRole === "ADMIN" && <AdminPanel />}
      {(userRole === "ADMIN" || userRole === "CONTRIBUTOR") && <CreateButton />}
      <span>Role: {userRole || "User"}</span>
    </>
  );
}
```

### Example: Navbar with Admin Links

```tsx
"use client"
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function Navbar() {
  const { user, userRole } = useAuth();

  return (
    <nav>
      <Link href="/">Home</Link>
      {user && <Link href="/profile">Profile</Link>}
      
      {userRole === "ADMIN" && (
        <>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/concepts">Concepts</Link>
          <Link href="/admin/contributors">Contributors</Link>
        </>
      )}
    </nav>
  );
}
```

## Route Structure for Multiple Roles

Organize routes using route groups:

```
app/
  (protected)/                    ← Authenticated users only
    layout.tsx                    ← Checks authentication
    
    (admin)/                      ← Admin-only route group
      admin/
        layout.tsx                ← requireRole("ADMIN")
        page.tsx                  → /admin
        concepts/page.tsx         → /admin/concepts
        
    (contributor)/                ← Contributor+ route group
      create/
        layout.tsx                ← requireRole(["ADMIN", "CONTRIBUTOR"])
        page.tsx                  → /create
        concepts/page.tsx         → /create/concepts
        
    profile/                      ← All authenticated users
      page.tsx                    → /profile
```

## How It Works

### Backend (`/me/role` endpoint)
Returns user's role:
```json
{ "role": "ADMIN" }
```

### AuthContext (`context/AuthContext.tsx`)
- Fetches role once on login/auth state change via `/api/user/role`
- Stores role in React Context alongside user/session
- Available to all Client Components via `useAuth()`
- Single fetch per auth state change (cached in context)

### API Route Proxy (`app/api/user/role/route.ts`)
- Next.js API route that proxies `/me/role` to backend
- Solves CORS issues (client → same-origin API → backend)
- Only called by AuthContext, not individual components

### Server-Side (`lib/rbac.ts`)
- Uses `apiFetch("/me/role")` to get role
- Direct communication with backend (no CORS in server)
- Works in Server Components only (layouts, pages)

### Performance Benefits
✅ **Single Fetch**: Role fetched once on authentication, not per component  
✅ **Shared State**: All components use same role from context  
✅ **No Prop Drilling**: Access via `useAuth()` hook anywhere  
✅ **Automatic Updates**: Role refreshes on auth state changes  
✅ **CORS-Free**: API route proxy eliminates cross-origin issues  

## Adding New Roles

1. Update type definition:
   ```typescript
   // context/AuthContext.tsx
   export type UserRole = "ADMIN" | "CONTRIBUTOR" | "LEARNER" | "MODERATOR" | null;
   
   // lib/rbac.ts
   export type UserRole = "ADMIN" | "CONTRIBUTOR" | "LEARNER" | "MODERATOR";
   ```

2. Add role check helper (optional):
   ```typescript
   // lib/rbac.ts
   export async function isModerator(): Promise<boolean> {
     const role = await getUserRole();
     return ["ADMIN", "MODERATOR"].includes(role);
   }
   ```

3. Create route group and layout:
   ```tsx
   // app/(protected)/(moderator)/moderate/layout.tsx
   import { requireRole } from "@/lib/rbac";
   
   export default async function ModeratorLayout({ children }) {
     await requireRole(["ADMIN", "MODERATOR"]);
     return <>{children}</>;
   }
   ```

4. Use in Client Components:
   ```tsx
   const { userRole } = useAuth();
   {userRole === "MODERATOR" && <ModeratorPanel />}
   ```

## Benefits of This Approach

✅ **Optimal Performance**: Role fetched once per auth state, not per component  
✅ **No Redundancy**: Single source of truth in AuthContext  
✅ **Scalable**: Easy to add new roles and permissions  
✅ **Type-Safe**: Full TypeScript support  
✅ **Clean Architecture**: Context for client, `apiFetch` for server  
✅ **Automatic Sync**: Role updates when user logs in/out  
✅ **Minimal Client Fetches**: Components read from context (1 API call total)  
