import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Background from "@/components/common/background";
import Navbar from "@/components/navbar";

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
    <Navbar/>
      <Background />
      {children}
    </>
  );
}
