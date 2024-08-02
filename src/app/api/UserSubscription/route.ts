import dbConnect from "@/lib/dbConnect";
import UserSubscription from "@/models/UserSubscription.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        await dbConnect();
        const {paymentId, username, email} = await request.json()
        if(![paymentId, username, email].every((item) => item)){
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "data not found"
                }),
                {status: 400}
            )
        }
        const user = await UserSubscription.create({
            email,
            username,
            active: true,
            paymentId,
        })
        if(!user){
            return new NextResponse(
                JSON.stringify({   
                    success: false,
                    message: "something went wrong while creating the user information"
                }),
                {status: 400}
            )
        }
        return new NextResponse(
            JSON.stringify({   
                success: true,
                message: "user created successfully",
                user
            }),
            {status: 201}
        )
    } catch (error) {
        console.log("error occurred: ", error);
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: "something went wrong while creating user",
                error
            }),
            {status: 500}
        )
    }
}


export async function GET(request: NextRequest){
    try {
        await dbConnect();
        const url = new URL(request.url)
        const email = url.searchParams.get("email")
        if(!email){
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "Data no found"
                }),
                {status: 400}
            )
        }
        const user = await UserSubscription.findOne({email});
        if(!user){
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "user not found"
                }),
                {status: 404}
            )
        }
        return new NextResponse(
            JSON.stringify({
                success: true,
                message: "user fetched successfully",
                user
            }),
            {status: 200}
        )
    } catch (error) {
        console.log("an error occured while fetching user data", error);
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: "something went wrong while fetching user data"
            }),
            {status: 500}
        )
    }
}

