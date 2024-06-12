import { NextResponse } from "next/server";
import { getAllFeatures, createFeature } from "@/data/feature";

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
    const { name, description, status, conditions } = await req.json();

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
    return NextResponse.json(
      { error: "Error creating feature" },
      { status: 500 }
    );
  }
}
