import { createClient } from "@libsql/client";
import fs from "fs";

async function main() {
  const db = createClient({ url: "file:local.db" });
  const sql = fs.readFileSync("scripts/init-db.sql", "utf-8");
  await db.executeMultiple(sql);
  console.log("DB Init Success");
}

main().catch(console.error);
