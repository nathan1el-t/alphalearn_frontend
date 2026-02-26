import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Background from "@/components/common/background";
import "@/components/sidebar/sidebar-shell.css";
import ProtectedChrome from "@/components/layout/protectedChrome";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return (
    <>
      <Background />
      <ProtectedChrome>{children}</ProtectedChrome>
    </>
  );
}
