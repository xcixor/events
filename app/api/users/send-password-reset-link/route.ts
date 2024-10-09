import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { EMAILTYPES } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const toEmail = req.nextUrl.searchParams.get("toEmail");
  if (!toEmail) {
    return NextResponse.json(
      { message: "Please provide a valid email address" },
      { status: 500 },
    );
  }
  const user = await db.user.findUnique({ where: { email: toEmail } });
  if (!user) {
    return NextResponse.json(
      { message: "No account was found with that email" },
      { status: 500 },
    );
  }
  try {
    const toEmail = user.email;
    const emailType = EMAILTYPES.RESETPASSWORD;
    const userId = user.id;
    const extraArgs = {
      userId: userId,
    };

    const emailVerificationResponse = await sendEmail({
      to_email: toEmail,
      emailType: emailType,
      extraArgs: extraArgs,
    });

    if (emailVerificationResponse.status === 200) {
      return NextResponse.json({ message: "Success." }, { status: 201 });
    }
    console.log(emailVerificationResponse.message);
    return NextResponse.json(
      { message: "Sending email failed." },
      { status: 500 },
    );
  } catch (error) {
    console.log("RESEND_VERIFICATION_EMAIL", "500");
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
