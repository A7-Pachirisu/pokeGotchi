import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { User } from '@supabase/supabase-js';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session) {
        window.location.href = '/login';
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
};

export default useAuth;
