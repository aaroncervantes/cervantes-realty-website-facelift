import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteListing, fetchAllListingsAdmin } from "@/lib/listings";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminListings() {
  const qc = useQueryClient();
  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["listings", "admin"],
    queryFn: fetchAllListingsAdmin,
  });
  const del = useMutation({
    mutationFn: deleteListing,
    onSuccess: () => {
      toast.success("Listing deleted");
      qc.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl">Listings</h1>
        <Button asChild variant="gold">
          <Link to="/admin/listings/new">New listing</Link>
        </Button>
      </div>
      {isLoading ? (
        <p className="mt-8 text-ink/50">Loading…</p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-ink/10 bg-white/50">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-ink/10 text-xs uppercase tracking-wide text-ink/50">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l.id} className="border-b border-ink/5">
                  <td className="px-4 py-3">{l.id}</td>
                  <td className="px-4 py-3">
                    {l.address}, {l.city_state_zip}
                  </td>
                  <td className="px-4 py-3">{l.price}</td>
                  <td className="px-4 py-3">{l.status}</td>
                  <td className="px-4 py-3">{l.is_published ? "Yes" : "No"}</td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild size="sm" variant="outline" className="mr-2">
                      <Link to={`/admin/listings/${l.id}/edit`}>Edit</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Delete listing ${l.id}?`)) del.mutate(l.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
