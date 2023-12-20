import { NextResponse } from "next/server";
import { addNewBusiness, getAllBusinesses } from "../services/business";
import { Business } from "@/types";
import getCurrentUser from "@/util/api/getCurrentUser";

export async function GET(): Promise<Response> {
  try {
    const businesses: Business[] = await getAllBusinesses();
    return NextResponse.json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return NextResponse.json(
      { error: "Error fetching businesses." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    const requestBody = await req.json();
    const currentUser = await getCurrentUser();
    await addNewBusiness({ ...requestBody, userId: currentUser?.id });
    return NextResponse.json({ message: "Business added successfully." });
  } catch (error: any) {
    console.error("Error adding business:", error);
    return NextResponse.json(
      { error: "Error adding businesses.", message: error?.message },
      { status: 500 }
    );
  }
}
