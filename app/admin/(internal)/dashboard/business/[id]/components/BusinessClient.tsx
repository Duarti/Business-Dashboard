"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { Business } from "@/types";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import useSWR from "swr";

const BusinessClient = () => {
  const { id } = useParams();
  const {
    data: business,
    isLoading,
    error,
  } = useSWR<Business>(`/api/business/${id}`);

  const { user, error: userError, loading: userLoading } = useCurrentUser();

  const pathName = usePathname();

  if (isLoading || userLoading) return <div>loading...</div>;
  if (error || userError) return <div>error...</div>;

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold">{business?.name}</h1>
      <p>Business owner : {business?.profile.email}</p>
      <p>
        Created at :{" "}
        {dayjs(business?.created_at).format("DD.MM.YYYY, hh:mm:ss")}
      </p>
      <div className="flex flex-col gap-2 items-center">
        {business?.profile.id === user.id && (
          <Link
            href={`${pathName}/edit`}
            className="bg-gray-300 p-1 rounded-md hover:bg-red-400"
          >
            Edit
          </Link>
        )}

        <Link href="/admin/dashboard" className="bg-gray-300 p-1 rounded-md">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default BusinessClient;
