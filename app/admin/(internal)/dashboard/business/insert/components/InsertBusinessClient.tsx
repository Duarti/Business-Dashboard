"use client";

import React, { useState, FC } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const InsertBusinessClient: FC = () => {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleCancel = () => {
    router.back();
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.post(`/api/business`, { name: businessName });
      router.back();
      toast.success("Business added successfully.");
    } catch (error) {
      toast.error("Something went wrong.");
      setIsSaving(false);
    }
  };

  const saveDisabled = isSaving || businessName.length < 3;

  return (
    <div className="center-container">
      <h1 className="text-5xl font-bold mb-10">Add New Business</h1>
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
            className="px-4 py-2 border rounded text-white bg-red-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 border rounded text-white bg-green-500 disabled:opacity-50 disabled:bg-gray-500"
            disabled={saveDisabled}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertBusinessClient;
