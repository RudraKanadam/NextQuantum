import { NextResponse } from "next/server";
import {
  createFeature,
  getFeatureById,
  getAllFeatures,
  updateFeature,
  deleteFeature,
  updateFeatureStatus,
} from "@/data/feature";

// POST create a new feature
export async function POST(req: Request) {
  try {
    const {
      name,
      description,
      status,
      environment,
      featureType,
      subscriptionType,
      subscriptionId,
      userId,
    } = await req.json();

    const conditions = [
      {
        environment,
        featureType,
        conditionStatus: status,
        userId,
        subscriptionId,
        subscriptionType,
      },
    ];

    if (!conditions || conditions.length === 0) {
      return NextResponse.json(
        { error: "Conditions are required for non-global features." },
        { status: 400 }
      );
    }

    const newFeature = await createFeature(
      name,
      description,
      status,
      conditions
    );

    if (newFeature) {
      return NextResponse.json(newFeature, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Error creating feature" },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error creating feature";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// GET all features
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const feature = await getFeatureById(id);
      if (feature) {
        return NextResponse.json(feature, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Feature not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching feature" },
        { status: 500 }
      );
    }
  } else {
    try {
      const features = await getAllFeatures();
      return NextResponse.json(features, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Error fetching features" },
        { status: 500 }
      );
    }
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

// PATCH update feature status only
export async function PATCH(req: Request) {
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

// DELETE a feature// DELETE a feature
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
