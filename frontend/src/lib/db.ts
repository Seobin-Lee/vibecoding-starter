import { createClient } from "@libsql/client";
import path from "node:path";

export type Profile = {
  id: number;
  name: string;
  team: string;
  position: string;
  uniform_number: string;
  tagline: string;
  introduction: string;
  image_path: string;
};

export type Highlight = {
  id: number;
  label: string;
};

const dbPath = path.join(process.cwd(), "local.db");

const defaultProfile: Profile = {
  id: 1,
  name: "오타니 쇼헤이",
  team: "LA 다저스",
  position: "투수 / 지명타자",
  uniform_number: "17번",
  tagline:
    "투수와 타자를 모두 소화하는 세계적인 야구 선수입니다. 강한 타격, 빠른 주루, 압도적인 경기 영향력으로 많은 팬들에게 사랑받고 있습니다.",
  introduction:
    "안녕하세요. 저는 오타니 쇼헤이입니다. 현재 LA 다저스에서 뛰고 있으며, 매 경기 팀에 도움이 되는 선수가 되기 위해 최선을 다하고 있습니다.",
  image_path: "/images/ohtani.jpeg",
};

const defaultHighlights: Highlight[] = [
  { id: 1, label: "강한 홈런 파워" },
  { id: 2, label: "빠른 주루" },
  { id: 3, label: "이도류 플레이" },
];

async function getDb() {
  const db = createClient({
    url: `file:${dbPath}`,
  });

  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      team TEXT NOT NULL,
      position TEXT NOT NULL,
      uniform_number TEXT NOT NULL,
      tagline TEXT NOT NULL,
      introduction TEXT NOT NULL,
      image_path TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL
    );
  `);

  return db;
}

export async function getProfile() {
  try {
    const db = await getDb();
    const result = await db.execute(
      "SELECT id, name, team, position, uniform_number, tagline, introduction, image_path FROM profile ORDER BY id LIMIT 1",
    );

    return result.rows.length > 0 ? (result.rows[0] as unknown as Profile) : defaultProfile;
  } catch (error) {
    console.error(error);
    return defaultProfile;
  }
}

export async function getHighlights() {
  try {
    const db = await getDb();
    const result = await db.execute("SELECT id, label FROM highlights ORDER BY id");

    return result.rows.length > 0 ? (result.rows as unknown as Highlight[]) : defaultHighlights;
  } catch (error) {
    console.error(error);
    return defaultHighlights;
  }
}
