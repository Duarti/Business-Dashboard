import React from "react";
import InsertBusinessClient from "./components/InsertBusinessClient";
import { withAuth } from "@/app/actions/withAuth";

const page = async () => {
  await withAuth();
  return <InsertBusinessClient />;
};

export default page;
