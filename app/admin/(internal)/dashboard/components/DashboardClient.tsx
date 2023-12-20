"use client";

import React, { useState, FC } from "react";
import useSWR from "swr";
import { Business } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import useCurrentUser from "@/hooks/useCurrentUser";
import Pagination from "./Pagination";
import toast from "react-hot-toast";
import { supabaseForClientComponent as supabase } from "@/lib/supabase.client";

const itemsPerPage = 10;
const DashboardClient: FC = () => {
  const {
    data: businessData,
    error,
    isLoading,
  } = useSWR<Business[]>("/api/business");
  const pathName = usePathname();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { user, error: userError, loading: userLoading } = useCurrentUser();
  const router = useRouter();

  if (isLoading || userLoading) return <div>Loading...</div>;
  if (error || userError) return <div>Error...</div>;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    businessData?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((businessData?.length || 0) / itemsPerPage);

  const isEditable = (business: Business) => user?.id === business.profile.id;

  const onLogoutClick = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <Link href="/" className="">
          <p className="p-4">Home</p>
        </Link>
        <button className="p-4" onClick={onLogoutClick}>
          Logout
        </button>
      </div>
      <div className="center-container">
        <h1 className="text-5xl font-bold mb-10">Dashboard</h1>
        <table className="border-spacing-10">
          <thead>
            <tr className="">
              <th>Business Name</th>
              <th>Email Address</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((business, index) => (
              <Link
                key={business.id}
                href={`${pathName}/business/${business.id}`}
                className="h-full w-full table-row mb-10 hover:bg-blue-200 cursor-default"
              >
                <td>{business.name}</td>
                <td>{business.profile.email}</td>
                <td>
                  {dayjs(business.created_at).format("DD.MM.YYYY, hh:mm:ss")}
                </td>
                <td>
                  <Link
                    href={`${pathName}/business/${business.id}/edit`}
                    className={
                      "bg-gray-300 p-1 rounded-md hover:bg-green-500 cursor-pointer " +
                      (isEditable(business)
                        ? " bg-green-300"
                        : "pointer-events-none")
                    }
                  >
                    Edit
                  </Link>
                </td>
              </Link>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
        <Link
          href={`${pathName}/business/insert`}
          className="bg-blue-500 text-white mt-10 rounded-lg p-2"
        >
          Add new business
        </Link>
      </div>
    </>
  );
};

export default DashboardClient;
