import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const supabase = createClientComponentClient();
  useEffect(() => {
    async function getUser() {
      try {
        const userData = await supabase.auth.getUser();
        if (userData?.error) {
          setError(userData?.error);
          return;
        }
        setUser(userData?.data?.user);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  return { user, loading, error };
};

export default useCurrentUser;
