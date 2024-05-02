import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function POST(req: NextRequest) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }
    const { title, description, isActive, startDate, endDate } =
      await req.json();

    if (!title || !description || !isActive || !startDate || !endDate) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const event = await db.event.create({
      data: {
        title,
        description,
        isActive,
        startDate,
        endDate,
      },
    });

    return NextResponse.json(
      {
        message: "Event created successfully.",
        id: event.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.toString() }, { status: 500 });
  }
}
