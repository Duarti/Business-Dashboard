"use client";

import { authenticateUsingPassword } from "@/lib/supabase.auth.client";
import { supabaseForClientComponent as supabase } from "@/lib/supabase.client";
import { AuthError, User, UserResponse } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const currentUser: UserResponse = await supabase.auth.getUser();
        setUser(currentUser.data.user);
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  if (user) {
    window.location.href = "/admin/dashboard";
  }

  if (loading) {
    return <h1>loading..</h1>;
  }

  const handleSignIn = async () => {
    if (!email || !password) return;
    try {
      const res = await authenticateUsingPassword({
        email,
        password,
      });

      if (!res.error) {
        window.location.href = "/admin/dashboard";
        toast.success("Signed in successfully");
        return;
      }

      if (res.error.message === "Invalid login credentials") {
        toast.error("Invalid login credentials");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={handleSignIn}
          className="w-full p-3 rounded-md bg-gray-700 enabled:bg-green-600 text-white enabled:hover:bg-green-800 focus:outline-none"
          disabled={!email || !password}
        >
          Sign In
        </button>
      </div>
    </main>
  );
}
