import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/utils/schema.tsx",
  dbCredentials: {
    url: "postgresql://ai-interview-mocker_owner:nei2F3dzjghZ@ep-delicate-moon-a5u5ks4r.us-east-2.aws.neon.tech/ai-content-generator?sslmode=require",
  },
});
