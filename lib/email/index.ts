import { mail } from "./gmail";
import { EMAILTYPES } from "@/constants";

export interface EmailProps {
  to_email: string;
  subject?: string;
  message?: string;
  emailType?: EMAILTYPES;
  extraArgs?: any;
}

export const sendEmail = async ({
  to_email,
  subject,
  message,
  emailType,
}: EmailProps): Promise<{ status: number; message: string }> => {
  try {
    const formProps = {
      subject,
      to_email,
      message,
      emailType,
    };
    const response = await mail(formProps);
    return { ...response };
  } catch (error) {
    throw new Error(String(error));
  }
};
