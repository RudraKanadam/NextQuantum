import { NextResponse } from "next/server";
import {
  getFeatureById,
  updateFeature,
  deleteFeature,
  updateFeatureAndConditionStatuses,
} from "@/data/feature";

// GET feature by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Feature ID is required" },
        { status: 400 }
      );
    }

    const feature = await getFeatureById(id);
    if (feature) {
      return NextResponse.json(feature, { status: 200 });
    } else {
      return NextResponse.json({ error: "Feature not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching feature" },
      { status: 500 }
    );
  }
}

// PUT update a feature
export async function PUT(req: Request) {
  try {
    const { id, name, description, status, conditions } = await req.json();

    const updatedFeature = await updateFeature(
      id,
      name,
      description,
      status,
      conditions
    );

    if (updatedFeature) {
      return NextResponse.json(updatedFeature, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Error updating feature" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating feature" },
      { status: 500 }
    );
  }
}

// DELETE a feature
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const success = await deleteFeature(id);
    if (success) {
      return NextResponse.json({ message: "Feature deleted" }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Error deleting feature" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting feature" },
      { status: 500 }
    );
  }
}

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
