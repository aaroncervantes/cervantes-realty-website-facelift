import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAdminShowcaseHome,
  useUpdateShowcaseHome,
  type ShowcaseHomeRow,
} from "@/lib/showcaseHomes";
import AdminShowcaseForm from "./AdminShowcaseForm";

const AdminShowcaseEdit = () => {
  const { id } = useParams();
  const { data, isLoading, error: loadError } = useAdminShowcaseHome(id);
  const update = useUpdateShowcaseHome();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (row: ShowcaseHomeRow) => {
    setError(null);
    try {
      await update.mutateAsync(row);
      navigate("/admin/showcase");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-gray-400">Loading…</p>;
  }
  if (loadError || !data) {
    return (
      <p className="text-sm text-gray-600">
        Community not found.{" "}
        <Link to="/admin/showcase" className="underline">
          Back
        </Link>
      </p>
    );
  }

  return (
    <AdminShowcaseForm
      initial={data}
      mode="edit"
      onSubmit={onSubmit}
      submitting={update.isPending}
      error={error}
    />
  );
};

export default AdminShowcaseEdit;
