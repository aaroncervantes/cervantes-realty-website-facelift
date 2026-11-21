import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  emptyShowcaseRow,
  useCreateShowcaseHome,
  type ShowcaseHomeRow,
} from "@/lib/showcaseHomes";
import AdminShowcaseForm from "./AdminShowcaseForm";

const AdminShowcaseNew = () => {
  const create = useCreateShowcaseHome();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (row: ShowcaseHomeRow) => {
    setError(null);
    const { id: _id, created_at: _c, updated_at: _u, ...payload } = row;
    try {
      await create.mutateAsync(payload);
      navigate("/admin/showcase");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <AdminShowcaseForm
      initial={emptyShowcaseRow()}
      mode="new"
      onSubmit={onSubmit}
      submitting={create.isPending}
      error={error}
    />
  );
};

export default AdminShowcaseNew;
