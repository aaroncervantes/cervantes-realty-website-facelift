import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
  Sprout,
} from "lucide-react";
import {
  useAdminShowcaseHomes,
  useDeleteShowcaseHome,
  useSeedShowcaseFromStatic,
  useToggleShowcasePublished,
  type ShowcaseHomeRow,
} from "@/lib/showcaseHomes";
import { formatCurrency } from "@/lib/mortgage";

function Row({
  home,
  onToggle,
  onDelete,
}: {
  home: ShowcaseHomeRow;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="w-full sm:w-40 h-28 sm:h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        {home.image ? (
          <img
            src={home.image}
            alt={home.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
            No image
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-bold text-[#1a1a1a]">{home.title}</span>
          <span
            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
              home.is_published
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {home.is_published ? "Published" : "Hidden"}
          </span>
        </div>
        <p className="text-sm text-gray-700 truncate">
          {home.area} · from {formatCurrency(Number(home.from_price))}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          /{home.slug} · {(home.gallery || []).length} photos · Order #
          {home.sort_order}
        </p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <Link
          to={`/admin/showcase/${home.id}/edit`}
          title="Edit"
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
        >
          <Pencil className="w-4 h-4" />
        </Link>
        <a
          href={`/new-homes/${home.slug}`}
          target="_blank"
          rel="noreferrer"
          title="View on site"
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
        <button
          type="button"
          onClick={onToggle}
          title={home.is_published ? "Hide" : "Publish"}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
        >
          {home.is_published ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
        <button
          type="button"
          onClick={onDelete}
          title="Delete"
          className="p-2 rounded-md hover:bg-red-50 text-gray-600 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

const AdminShowcase = () => {
  const { data = [], isLoading, error } = useAdminShowcaseHomes();
  const toggle = useToggleShowcasePublished();
  const del = useDeleteShowcaseHome();
  const seed = useSeedShowcaseFromStatic();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-1">
            New Homes showcase
          </h1>
          <p className="text-sm text-gray-500 max-w-xl">
            Plug in communities + photo zips. Public pages stay browse-only — no
            inquire, no street addresses.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={seed.isPending}
            onClick={() => {
              if (
                confirm(
                  "Import the static seed communities into the CMS? Existing slugs will update.",
                )
              ) {
                seed.mutate();
              }
            }}
            className="inline-flex items-center gap-2 border border-gray-300 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider hover:border-[#c9a84c] disabled:opacity-50"
          >
            <Sprout className="w-3.5 h-3.5" />
            {seed.isPending ? "Importing…" : "Import seed"}
          </button>
          <Link
            to="/admin/showcase/new"
            className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#c9a84c]"
          >
            <Plus className="w-3.5 h-3.5" /> Add community
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 text-sm text-amber-800 bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="font-semibold mb-1">Showcase table not ready</p>
          <p>
            Run{" "}
            <code className="text-xs bg-white px-1 py-0.5 border">
              supabase/showcase_homes.sql
            </code>{" "}
            in the Supabase SQL Editor for this project, then refresh. Error:{" "}
            {(error as Error).message}
          </p>
        </div>
      )}

      {seed.isError && (
        <p className="mb-4 text-sm text-red-600">
          {(seed.error as Error).message}
        </p>
      )}
      {seed.isSuccess && (
        <p className="mb-4 text-sm text-green-700">Seed imported.</p>
      )}

      {isLoading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : data.length === 0 && !error ? (
        <p className="text-sm text-gray-500">
          No communities yet. Add one or import the seed.
        </p>
      ) : (
        <div className="space-y-3">
          {data.map((home) => (
            <Row
              key={home.id}
              home={home}
              onToggle={() =>
                toggle.mutate({
                  id: home.id,
                  is_published: !home.is_published,
                })
              }
              onDelete={() => {
                if (confirm(`Delete “${home.title}”?`)) del.mutate(home.id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminShowcase;
