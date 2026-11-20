import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Building2, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

const AdminLayout = () => {
  const { isAuthed, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthed) navigate("/admin/login", { replace: true });
  }, [loading, isAuthed, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center text-gray-400 text-sm">
        Loading…
      </div>
    );
  }

  if (!isAuthed) return null;

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://assets.cdn.filesafe.space/yvIB8uaPt79VRC8MA1HI/media/69e6c389571cca8e954ff6a8.png"
              alt="Cervantes Realty"
              className="h-8 w-auto object-contain"
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 hidden sm:inline">
              CMS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/listings"
              className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] hover:text-[#c9a84c] flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5" /> Listings
            </Link>
            <a
              href="/"
              className="text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-[#1a1a1a]"
            >
              View Site
            </a>
            <button
              onClick={async () => {
                await signOut();
                navigate("/admin/login");
              }}
              className="text-xs font-semibold uppercase tracking-wider text-gray-500 hover:text-red-600 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
