"use server";
import { createSupabaseForServerComponent } from "@/lib/supabase.server";
import { redirect } from "next/navigation";

export const withAuth = async () => {
  const supabase = createSupabaseForServerComponent();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
};
