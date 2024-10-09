import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(req: NextRequest) {
  const toEmail = req.nextUrl.searchParams.get("toEmail");
  if (!toEmail) {
    return NextResponse.json(
      { message: "Please provide a valid email address" },
      { status: 500 },
    );
  }
  const user = await db.user.findUnique({
    where: { email: toEmail },
    include: { profile: true },
  });
  if (!user) {
    return NextResponse.json(
      { message: "No account was found with that email" },
      { status: 500 },
    );
  }
  try {
    const toEmail = user.email;

    const passwordResetLink = `${env.BASE_DOMAIN}/auth/reset-password?email=${toEmail}`;
    const message = `Hello ${user.profile?.firstName} ${user.profile?.lastName}, <br/> <br/>
    You are receiving this email because we received a password reset request for your account. <br/>
    If you did not request a password reset, please ignore this email. <br/> <br/>
    Click the link below to reset your password. <br/>
    <a href="${passwordResetLink}">Reset Password</a> <br/>
    `;
    const emailVerificationResponse = await sendEmail({
      to_email: toEmail,
      message,
      subject: "PES Academy - Email Verification",
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
