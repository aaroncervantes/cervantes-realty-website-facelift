import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getSupabase } from "./supabaseClient";

export const ADMIN_EMAIL = "aaron@cervantesre.com";

interface AuthContextValue {
  isAuthed: boolean;
  loading: boolean;
  signIn: (password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      setIsAuthed(!!s && s.user.email === ADMIN_EMAIL);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session && session.user.email === ADMIN_EMAIL);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (password: string) => {
    const supabase = getSupabase();
    if (!supabase) return { error: "Supabase is not configured yet." };
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signOut = async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsAuthed(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthed, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
