import { NextResponse } from "next/server";
import { updateFeatureAndConditionStatuses } from "@/data/feature";

// PATCH update feature and condition statuses
export async function PATCH(req: Request) {
  try {
    const { featureId, featureStatus, conditionStatuses } = await req.json();

    const updatedFeature = await updateFeatureAndConditionStatuses(
      featureId,
      featureStatus,
      conditionStatuses
    );

    if (updatedFeature) {
      return NextResponse.json(updatedFeature, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Error updating feature and condition statuses" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating feature and condition statuses" },
      { status: 500 }
    );
  }
}
