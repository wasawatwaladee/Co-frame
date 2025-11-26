import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
   client: {
    adapter: "mysql",
    url: process.env.DATABASE_URL, // ต้องแน่ใจว่า .env มี DATABASE_URL
  },
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});





