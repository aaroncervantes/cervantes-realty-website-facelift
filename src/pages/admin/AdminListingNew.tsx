import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { emptyListing, upsertListing } from "@/lib/listings";
import { AdminListingForm } from "./AdminListingForm";
import { toast } from "sonner";

export default function AdminListingNew() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: upsertListing,
    onSuccess: (row) => {
      toast.success("Listing created");
      qc.invalidateQueries({ queryKey: ["listings"] });
      navigate(`/admin/listings/${row.id}/edit`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <h1 className="font-display text-3xl">New listing</h1>
      <AdminListingForm
        initial={emptyListing()}
        busy={mutation.isPending}
        onSubmit={(values) => mutation.mutate(values)}
      />
    </div>
  );
}
