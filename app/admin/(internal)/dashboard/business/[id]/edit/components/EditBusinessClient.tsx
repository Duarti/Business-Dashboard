"use client";
import React, { useEffect, useState, FC } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Business } from "@/types";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import useSWR from "swr";
import toast from "react-hot-toast";
import Modal from "react-modal";

const EditBusinessClient: FC = () => {
  const { user, loading: userLoading } = useCurrentUser();
  const [businessName, setBusinessName] = useState<string>("");
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [deleteDisabled, setDeleteDisabled] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {
    data: business,
    isLoading,
    error,
  } = useSWR<Business>(`/api/business/${id}`);

  useEffect(() => {
    if (business) {
      setBusinessName(business.name);
    }
  }, [business]);

  const handleSave = async (): Promise<void> => {
    if (business?.name === businessName) return;
    setIsSaving(true);
    try {
      await axios.put(`/api/business/${id}`, { name: businessName });
      router.back();
      toast.success("Business updated successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
      setDeleteDisabled(false);
    }
  };

  const handleCancel = (): void => {
    router.back();
  };

  const handleDelete = async (): Promise<void> => {
    setIsDeleteModalOpen(true);
  };

  const onDeleteBusinessConfirm = async () => {
    setDeleteDisabled(true);
    try {
      await axios.delete(`/api/business/${id}`);
      router.back();
      toast.success("Business deleted successfully.");
    } catch (error) {
      setDeleteDisabled(false);
      toast.error("Something went wrong.");
    }
  };

  const disabled = business?.profile.id !== user?.id;
  const saveDisabled =
    business?.name === businessName || isSaving || businessName.length < 3;

  if (userLoading || isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Modal
        isOpen={isDeleteModalOpen}
        onAfterOpen={() => {}}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col items-center gap-3">
          Are you sure you want to delete this business?
          <div className="flex gap-3">
            <button
              className="px-4 py-2 border rounded disabled:opacity-50 disabled:bg-gray-500"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 border rounded text-white bg-red-500 disabled:opacity-50 disabled:bg-gray-500"
              disabled={disabled || deleteDisabled}
              onClick={onDeleteBusinessConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <div className="w-full min-h-[100vh] flex flex-col items-center justify-center gap-5">
        <form className="flex flex-col items-center gap-3">
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Business Name"
            className="p-2 border-2 border-gray-300 rounded"
          />
          {businessName.length < 3 && businessName && (
            <p className="text-xs text-gray-500">
              Business Name must be at least 3 characters long.
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border rounded disabled:opacity-50 disabled:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 border rounded text-white bg-red-500 disabled:opacity-50 disabled:bg-gray-500"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 border rounded text-white bg-green-500 disabled:opacity-50 disabled:bg-gray-500"
              disabled={disabled || saveDisabled}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditBusinessClient;
