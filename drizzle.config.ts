import { defineConfig } from "drizzle-kit"; 
import * as dotenv from "dotenv";
dotenv.config({
  path: __dirname + "/.env",
});
export default defineConfig({ 
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle", 
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
