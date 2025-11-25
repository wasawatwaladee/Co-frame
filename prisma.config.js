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

// import "dotenv/config";
// import { defineConfig } from "@prisma/client";

// export default defineConfig({
//   schema: "prisma/schema.prisma", // path ของ schema
//   client: {
//     adapter: "mysql",
//     url: process.env.DATABASE_URL, // ต้องแน่ใจว่า .env มี DATABASE_URL
//   },
//   datasource: {
//     name: "db",       // ต้องตรงกับ schema.prisma
//     provider: "mysql",
//   },
//   migrations: {
//     path: "prisma/migrations",
//   },
// });



