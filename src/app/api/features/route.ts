import { NextResponse } from "next/server";
import {
  getAllFeatures,
  getFeatureById,
  createFeature,
  updateFeature,
  deleteFeature,
} from "@/data/feature"; // Ensure this import path is correct

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const feature = await getFeatureById(id);
      if (feature) {
        return NextResponse.json(feature, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Feature not found" },
          { status: 404 }
        );
      }
    } else {
      const features = await getAllFeatures();
      return NextResponse.json(features, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching features" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      name,
      environment,
      status,
      subscriptionType,
      subscriptionId,
      userId,
    } = await req.json();
    const newFeature = await createFeature(
      name,
      environment,
      status,
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

export async function PUT(req: Request) {
  try {
    const {
      id,
      name,
      environment,
      status,
      subscriptionType,
      subscriptionId,
      userId,
    } = await req.json();
    const updatedFeature = await updateFeature(
      id,
      name,
      environment,
      status,
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
