import { createClient } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/rbac";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const mode = requestUrl.searchParams.get("mode");
    const from = requestUrl.searchParams.get("from");
    const isAdminMode = mode === "admin";

    if (code) {
        const supabase = await createClient();
        await supabase.auth.exchangeCodeForSession(code);

        const requestedAdminPath = from && from.startsWith("/admin") ? from : null;

        try {
            const role = await getUserRole();

            if (isAdminMode) {
                if (role !== "ADMIN") {
                    await supabase.auth.signOut();
                    const signinUrl = new URL("/signin", requestUrl.origin);
                    signinUrl.searchParams.set("mode", "admin");
                    if (requestedAdminPath) {
                        signinUrl.searchParams.set("from", requestedAdminPath);
                    }
                    signinUrl.searchParams.set("error", "admin_required");
                    return NextResponse.redirect(signinUrl);
                }

                return NextResponse.redirect(
                    new URL(requestedAdminPath || "/admin", requestUrl.origin)
                );
            }

            if (role === "ADMIN") {
                return NextResponse.redirect(new URL("/admin", requestUrl.origin));
            }
        } catch {
            if (isAdminMode) {
                await supabase.auth.signOut();
                const signinUrl = new URL("/signin", requestUrl.origin);
                signinUrl.searchParams.set("mode", "admin");
                signinUrl.searchParams.set("error", "admin_required");
                return NextResponse.redirect(signinUrl);
            }
        }
    }

    // Redirect to lessons after successful auth
    return NextResponse.redirect(new URL("/lessons", requestUrl.origin));
}
