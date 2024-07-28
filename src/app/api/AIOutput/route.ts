import dbConnect from "@/lib/dbConnect";
import AIOutput from "@/models/AIOutput.model";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server"; // Ensure you're importing the correct clerkClient for user data
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

// Handle POST request
export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Ensure database connection

    // Extract data from the request body
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

    // Get the user's authentication details using Clerk
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

    // Fetch the user's details using Clerk's clerkClient
    const user = await clerkClient.users.getUser(userId);

    // Check if the user was successfully fetched
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 401 }
      );
    }

    // Create a new AIOutput entry
    const output = await AIOutput.create({
      formData,
      templateSlug: slug,
      aiResponse,
      createdAt: moment().format("YYYY-MM-DD"), // Use standard date format
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
      { status: 201 } // 201 indicates a resource was successfully created
    );
  } catch (error: any) {
    console.error("An unexpected error occurred: ", error.message);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "An error occurred while creating AI output",
        error: error.message, // Include error details for debugging
      }),
      { status: 500 }
    );
  }
}

// Handle GET request
export async function GET(request: NextRequest) {
  try {
    // Connect to the MongoDB database
    await dbConnect();

    // Get the user's authentication details using Clerk
    const { userId } = getAuth(request);

    if (!userId) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "User not authenticated",
        }),
        { status: 401 }
      );
    }``

    // Fetch the user's details using Clerk's clerkClient
    const user = await clerkClient.users.getUser(userId);

    // Check if the user was successfully fetched
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 401 }
      );
    }

    // Fetch AIOutput documents created by the user
    const output = await AIOutput.find({
      createdBy: user.emailAddresses[0].emailAddress, // Assuming createdBy holds the email
    });

    // Check if the output was successfully fetched
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
      { status: 200 } // Indicate success with HTTP 200 status
    );
  } catch (error: any) {
    console.error("An unexpected error occurred: ", error.message);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "An error occurred while fetching AI output",
        error: error.message, // Optionally include the error message for debugging
      }),
      { status: 500 }
    );
  }
}
