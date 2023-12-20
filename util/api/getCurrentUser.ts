import { createSupabaseForRouteHandler } from "@/lib/supabase.server";
import { User } from "@supabase/supabase-js";

/**
 * Fetches the current authenticated user using Supabase.
 * @returns The current user if authenticated.
 * @throws {Error} if there's an error fetching the current user.
 */
async function getCurrentUser(): Promise<User> {
  const supabase = createSupabaseForRouteHandler();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error("Error fetching current user.");
  }

  if (!user) {
    throw new Error("No current user found.");
  }

  return user;
}

export default getCurrentUser;
