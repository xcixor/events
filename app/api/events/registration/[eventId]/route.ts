import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } },
) {
  try {
    let { name, email, phoneNumber, company, timeSlot } = await req.json();

    if (!name || !email || !phoneNumber || !company) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const duplicate = await db.attendee.findFirst({ where: { email: email } });

    if (duplicate) {
      return NextResponse.json(
        { message: "You have already registered to this event." },
        { status: 409 },
      );
    }

    const event = await db.event.findUnique({
      where: { id: params.eventId },
    });

    if (!event) {
      return NextResponse.json(
        { message: "Insufficient data." },
        { status: 404 },
      );
    }
    const user = await db.attendee.create({
      data: {
        name,
        email,
        phoneNumber,
        company,
      },
    });
    const attendance = await db.attendance.create({
      data: { attendeeId: user.id, eventId: event.id },
    });
    const attendances = await db.attendance.findMany({
      where: { eventId: params.eventId, timeSlot: timeSlot },
    });

    if (attendances.length > 13) {
      return NextResponse.json(
        {
          message: "That timeslot is overbooked, kindly select another.",
        },
        { status: 400 },
      );
    }
    const emailVerificationResponse = await sendEmail({
      toEmail: email,
      subject: "Registration Successful",
      message: `Hello ${name}, your registration for ${event?.title} was recorded. See you on Thursday the 9th in the ${timeSlot}. \n\n Thank you for your continued support.`,
    });
    await db.attendance.update({
      where: { id: attendance.id },
      data: {
        confirmed: true,
      },
    });
    if (emailVerificationResponse.status === 200) {
      return NextResponse.json(
        {
          message: "Registration successful.",
          userId: user.id,
        },
        { status: 201 },
      );
    }
    return NextResponse.json(
      {
        message: "Registration successful email not sent.",
        userId: user.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.toString() }, { status: 500 });
  }
}
