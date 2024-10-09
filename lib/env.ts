import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1, "Please provide DATABASE_URL"),
  GOOGLE_CLIENT_ID: zod.string().min(1, "Please provide GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: zod
    .string()
    .min(1, "Please provide GOOGLE_CLIENT_SECRET"),
  NEXTAUTH_URL: zod.string().min(1, "Please provide NEXTAUTH_URL"),
  NEXTAUTH_SECRET: zod.string().min(1, "Please provide NEXTAUTH_SECRET"),
  GS_BUCKET_URL: zod.string().min(1, "Please provide GS_BUCKET_URL"),
  GS_CREDENTIALS: zod.string().min(1, "Please provide GS_CREDENTIALS"),
  GS_BUCKET_NAME: zod.string().min(1, "Please provide GS_BUCKET_NAME"),
  GS_PUBLIC_BUCKET_NAME: zod.string().min(1, "Please provide GS_BUCKET_NAME"),
  GS_LOCATION: zod.string().min(1, "Please provide GS_LOCATION"),
  NODE_ENV: zod.string().min(1, "Please provide ").default("development"),
  ADMIN_EMAIL: zod.string().min(1, "Please provide ADMIN_EMAIL"),

  BASE_DOMAIN: zod.string().min(1),
  SERVICE_ID: zod.string().min(1),
  DEFAULT_TEMPLATE_ID: zod.string().min(1),
  PUBLIC_KEY: zod.string().min(1),
  PRIVATE_KEY: zod.string().min(1),

  // oauth
  CLIENT_ID: zod.string().min(1, "Please provide CLIENT_ID"),
  CLIENT_SECRET: zod.string().min(1, "Please provide CLIENT_SECRET"),
  REFRESH_TOKEN: zod.string().min(1, "Please provide REFRESH_TOKEN"),
  SMTP_AUTH_USER: zod.string().min(1, "Please provide SMTP_AUTH_USER"),
});

export const env = envSchema.parse(process.env);
