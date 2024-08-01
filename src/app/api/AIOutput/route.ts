import dbConnect from "@/lib/dbConnect";
import AIOutput from "@/models/AIOutput.model";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server"; 
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    await dbConnect(); 

    const { formData, slug, aiResponse } = await request.json();
    console.log(formData, slug);

    // Validate input data
    if (!formData || !slug || !aiResponse) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Data not found",
        }),
        { status: 400 }
      );
    }

    const { userId } = getAuth(request);

    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "User not authenticated",
        }),
        { status: 401 }
      );
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 401 }
      );
    }

    const output = await AIOutput.create({
      formData,
      templateSlug: slug,
      aiResponse,
      createdBy: user.emailAddresses[0].emailAddress, // Assuming the first email is the primary one
    });

    // Check if the output was successfully created
    if (!output) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Something went wrong while creating AI output",
        }),
        { status: 500 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "AI output created successfully",
        output,
      }),
      { status: 201 } 
    );
  } catch (error: any) {
    console.error("An unexpected error occurred: ", error.message);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "An error occurred while creating AI output",
        error: error.message, 
      }),
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { userId } = getAuth(request);

    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "User not authenticated",
        }),
        { status: 401 }
      );
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 401 }
      );
    }

    const output = await AIOutput.find({
      createdBy: user.emailAddresses[0].emailAddress, 
    });

    if (!output || output.length === 0) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "No AI output found for the user",
        }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "AI output fetched successfully",
        output,
      }),
      { status: 200 } 
    );
  } catch (error: any) {
    console.error("An unexpected error occurred: ", error.message);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "An error occurred while fetching AI output",
        error: error.message, 
      }),
      { status: 500 }
    );
  }
}
