import { getHtmlTemplate } from "./utils";
import { EmailProps } from ".";
import { env } from "../env";
import nodemailer from "nodemailer";
import { google } from "googleapis";
const { OAuth2 } = google.auth;

const createTransporter = async () => {
  try {
    const oauth2Client = new OAuth2(
      env.CLIENT_ID,
      env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground",
    );

    oauth2Client.setCredentials({
      refresh_token: env.REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log("*ERR: ", err);
          reject();
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: env.SMTP_AUTH_USER,
        accessToken,
        clientId: env.CLIENT_ID,
        clientSecret: env.CLIENT_SECRET,
        refreshToken: env.REFRESH_TOKEN,
      },
    });
    return transporter;
  } catch (err) {
    return err;
  }
};

export const mail = async ({
  to_email,
  subject,
  message,
}: EmailProps): Promise<{ status: number; message: string }> => {
  try {
    const htmlTemplate = getHtmlTemplate(subject, message);

    const mailOptions = {
      from: env.SMTP_AUTH_USER,
      to: to_email,
      subject: subject,
      html: message,
      alternative: true,
    };

    let emailTransporter = await createTransporter();
    const response = await emailTransporter.sendMail(mailOptions);
    if (response.accepted.length > 0) {
      return {
        status: 200,
        message: "Email sent successfully.",
      };
    }
    console.log("ERROR: ", response);
    return {
      status: 500,
      message: "Email failed to send.",
    };
  } catch (err) {
    console.log("ERROR: ", err);
    return {
      status: 500,
      message: "Email failed to send.",
    };
  }
};
