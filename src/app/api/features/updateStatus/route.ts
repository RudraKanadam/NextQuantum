import { NextResponse } from "next/server";
import { updateFeatureStatus } from "@/data/feature";

// PUT update a feature status
export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const updatedFeature = await updateFeatureStatus(id, status);

    if (updatedFeature) {
      return NextResponse.json(updatedFeature, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Error updating feature status" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating feature status" },
      { status: 500 }
    );
  }
}
