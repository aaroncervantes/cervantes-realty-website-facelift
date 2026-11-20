import { useParams, useNavigate } from "react-router-dom";
import {
  useAdminListing,
  useUpdateListing,
  type ListingRow,
} from "@/lib/listings";
import AdminListingForm from "./AdminListingForm";

const AdminListingEdit = () => {
  const { id } = useParams();
  const { data, isLoading } = useAdminListing(id);
  const update = useUpdateListing();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <p className="text-gray-400 text-sm py-12 text-center">
        Loading listing…
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-red-600 text-sm py-12 text-center">
        Listing not found.
      </p>
    );
  }

  const onSubmit = async (row: ListingRow) => {
    const { id: _id, created_at: _c, updated_at: _u, ...rest } = row;
    try {
      await update.mutateAsync({ id: Number(id), ...rest } as ListingRow);
      navigate("/admin/listings");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <AdminListingForm
      initial={data}
      mode="edit"
      onSubmit={onSubmit}
      submitting={update.isPending}
    />
  );
};

export default AdminListingEdit;
