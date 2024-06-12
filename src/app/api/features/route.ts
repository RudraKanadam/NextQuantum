import { NextResponse } from "next/server";
import {
  getFeatureById,
  getAllFeatures,
  createFeature,
  updateFeature,
  deleteFeature,
} from "@/data/feature";

// GET all features
export async function GET() {
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

// POST create a new feature
export async function POST(req: Request) {
  try {
    const {
      name,
      description,
      environment,
      status,
      featureType,
      subscriptionType,
      subscriptionId,
      userId,
    } = await req.json();

    const newFeature = await createFeature(
      name,
      description,
      environment,
      status,
      featureType,
      subscriptionType,
      subscriptionId,
      userId
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
    return NextResponse.json(
      { error: "Error creating feature" },
      { status: 500 }
    );
  }
}

// PUT update a feature
export async function PUT(req: Request) {
  try {
    const {
      id,
      name,
      description,
      environment,
      status,
      featureType,
      subscriptionType,
      subscriptionId,
      userId,
    } = await req.json();

    const updatedFeature = await updateFeature(
      id,
      name,
      description,
      environment,
      status,
      featureType,
      subscriptionType,
      subscriptionId,
      userId
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
