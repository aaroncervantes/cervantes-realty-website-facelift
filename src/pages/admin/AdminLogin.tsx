import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  const { isAuthed, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!loading && isAuthed) return <Navigate to="/admin/listings" replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await signIn(password);
    setBusy(false);
    if (res.error) setError(res.error);
    else navigate("/admin/listings");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-ink/10 bg-white/60 p-8"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-gold">Admin</p>
        <h1 className="mt-2 font-display text-3xl">Sign in</h1>
        <p className="mt-2 text-sm text-ink/55">aaron@cervantesre.com</p>
        <div className="mt-6 space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <Button type="submit" className="mt-6 w-full" variant="gold" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
