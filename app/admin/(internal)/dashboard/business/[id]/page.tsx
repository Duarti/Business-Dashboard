import React from "react";
import BusinessClient from "./components/BusinessClient";
import { withAuth } from "@/app/actions/withAuth";

const page = async () => {
  await withAuth();
  return <BusinessClient />;
};

export default page;
