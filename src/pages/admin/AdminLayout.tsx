import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const { isAuthed, loading, signOut } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        Loading…
      </div>
    );
  }
  if (!isAuthed) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-ink/10 bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link to="/admin/listings" className="font-display text-xl">
              Cervantes Admin
            </Link>
            <Link to="/admin/listings" className="text-sm text-cream/70 hover:text-gold">
              Listings
            </Link>
            <Link to="/" className="text-sm text-cream/70 hover:text-gold">
              View site
            </Link>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-cream/30 text-cream hover:bg-cream/10"
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <Outlet />
      </main>
    </div>
  );
}
