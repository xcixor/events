import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { getLoggedInUser } from "@/lib/auth/utils";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { eventId: string } },
) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }
    const values = await req.json();
    console.log(values);
    if (!values) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const event = await db.event.update({
      where: { id: params.eventId },
      data: {
        ...values,
      },
    });

    return NextResponse.json(
      {
        message: "Event updated successfully.",
        id: event.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.toString() }, { status: 500 });
  }
}
