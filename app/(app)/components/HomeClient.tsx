"use client";
import Link from "next/link";
import React from "react";

const HomeClient = () => {
  return (
    <div className="container">
      <Link href="/admin/dashboard">
        <p className="p-3">Go to Dashboard</p>
      </Link>
    </div>
  );
};

export default HomeClient;
