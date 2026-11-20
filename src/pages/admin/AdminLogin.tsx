import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth, ADMIN_EMAIL } from "@/lib/auth";

const AdminLogin = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(password);
    setLoading(false);
    if (err) setError(err);
    else navigate("/admin/listings");
  };

  return (
    <div className="min-h-screen bg-[#f7f5f2] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="https://assets.cdn.filesafe.space/yvIB8uaPt79VRC8MA1HI/media/69e6c389571cca8e954ff6a8.png"
            alt="Cervantes Realty"
            className="h-16 w-auto object-contain mx-auto mb-6"
          />
          <h1 className="font-serif text-2xl font-bold text-[#1a1a1a]">
            Admin Access
          </h1>
          <p className="text-xs text-gray-500 mt-1 tracking-wide uppercase">
            Cervantes Realty CMS
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                placeholder="Enter admin password"
                className="w-full rounded-md border border-gray-300 bg-[#f7f5f2] pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c]"
              />
            </div>
          </div>
          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1a1a1a] text-white py-2.5 rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-[#c9a84c] transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
          <p className="text-[10px] text-gray-400 text-center pt-2">
            Admin account: {ADMIN_EMAIL}
          </p>
        </form>
        <div className="text-center mt-6">
          <a href="/" className="text-xs text-gray-500 hover:text-[#1a1a1a]">
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
