import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  emptyAdminListing,
  useCreateListing,
  type ListingRow,
} from "@/lib/listings";
import AdminListingForm from "./AdminListingForm";

const AdminListingNew = () => {
  const create = useCreateListing();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (row: ListingRow) => {
    setError(null);
    const { id: _id, created_at: _c, updated_at: _u, ...payload } = row;
    try {
      await create.mutateAsync(payload);
      navigate("/admin/listings");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <AdminListingForm
      initial={emptyAdminListing()}
      mode="new"
      onSubmit={onSubmit}
      submitting={create.isPending}
      error={error}
    />
  );
};

export default AdminListingNew;
