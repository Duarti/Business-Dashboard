import { NextResponse } from "next/server";
import { Business } from "@/types";
import {
  deleteBusinessById,
  getBusinessById,
  updateBusinessById,
} from "../../services/business";
import getCurrentUser from "@/util/api/getCurrentUser";

type RequestParams = { params: { id: string } };

export async function GET(
  req: Request,
  { params }: RequestParams
): Promise<Response> {
  try {
    const business: Business = await getBusinessById(params.id);
    return NextResponse.json(business);
  } catch (error) {
    console.error("Error fetching business:", error);
    return NextResponse.json(
      { error: "Error fetching business." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: RequestParams
): Promise<Response> {
  try {
    const currentUser = await getCurrentUser();
    const businessToDelete: Business = await getBusinessById(params.id);

    if (businessToDelete.profile.id === currentUser?.id) {
      await deleteBusinessById(params.id);
      return NextResponse.json(businessToDelete);
    } else {
      return NextResponse.json(
        { error: "You are not authorized to delete this business." },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error in deleting business:", error);
    return NextResponse.json(
      { error: "Error deleting business." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: RequestParams
): Promise<Response> {
  const body = await req.json();

  try {
    const currentUser = await getCurrentUser();
    const businessToUpdate: Business = await getBusinessById(params.id);

    if (businessToUpdate.profile.id === currentUser?.id) {
      if (body.userId) delete body.userId;
      await updateBusinessById(params.id, body);
      return NextResponse.json({ message: "Business updated successfully." });
    } else {
      return NextResponse.json(
        { error: "You are not authorized to update this business." },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error updating business:", error);
    return NextResponse.json(
      { error: "Error updating business." },
      { status: 500 }
    );
  }
}
