import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchListingById, upsertListing } from "@/lib/listings";
import { AdminListingForm } from "./AdminListingForm";
import { toast } from "sonner";

export default function AdminListingEdit() {
  const { id } = useParams();
  const listingId = Number(id);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => fetchListingById(listingId),
    enabled: Number.isFinite(listingId),
  });
  const mutation = useMutation({
    mutationFn: upsertListing,
    onSuccess: () => {
      toast.success("Listing saved");
      qc.invalidateQueries({ queryKey: ["listings"] });
      qc.invalidateQueries({ queryKey: ["listing", listingId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <p>Loading…</p>;
  if (!data) {
    return (
      <p>
        Listing not found.{" "}
        <button className="text-gold underline" onClick={() => navigate("/admin/listings")}>
          Back
        </button>
      </p>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl">Edit listing #{data.id}</h1>
      <AdminListingForm
        initial={data}
        busy={mutation.isPending}
        onSubmit={(values) => mutation.mutate({ ...values, id: data.id })}
      />
    </div>
  );
}
