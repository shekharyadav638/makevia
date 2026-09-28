import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { db } from "../src/lib/supabase.ts";
import { classify, ncrCity, parseCsvLine, titleCase } from "../src/lib/mca.ts";

const BATCH = 500;
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const ncr = args.includes("--ncr");
const files = args.filter((a) => !a.startsWith("--"));

if (!files.length) {
  console.error("Usage: npm run import:mca -- [--dry-run] [--ncr] <company_master.csv> [...more.csv]");
  process.exit(1);
}

type Row = Record<string, string>;
const clean = (v: string | undefined) => (v && v !== "NA" ? v.trim() : null);

let batch: object[] = [];
const counts: Record<string, number> = {};
let read = 0;

async function flush() {
  if (!batch.length || dryRun) return void (batch = []);
  await db("providers?on_conflict=cin", {
    method: "POST",
    headers: { Prefer: "resolution=ignore-duplicates,return=minimal" },
    body: JSON.stringify(batch),
  });
  batch = [];
}

for (const file of files) {
  let header: string[] | undefined;
  for await (const line of createInterface({ input: createReadStream(file), crlfDelay: Infinity })) {
    if (!line.trim()) continue;
    const cells = parseCsvLine(line);
    if (!header) {
      header = cells.map((h) => h.trim().toUpperCase());
      continue;
    }
    const row: Row = Object.fromEntries(header.map((h, i) => [h, cells[i] ?? ""]));
    read++;
    if (row.COMPANY_STATUS?.toUpperCase() !== "ACTIVE") continue;

    const city = ncr ? ncrCity(row.REGISTERED_STATE ?? "", row.REGISTERED_OFFICE_ADDRESS ?? "") : null;
    if (ncr && !city) continue;

    const cin = row.CORPORATE_IDENTIFICATION_NUMBER;
    const match = classify(cin, row.PRINCIPAL_BUSINESS_ACTIVITY ?? "", row.COMPANY_NAME ?? "");
    if (!match) continue;

    const key = `${city ? `${city} · ` : ""}${match.service}${match.categories.length ? `/${match.categories[0]}` : ""}`;
    counts[key] = (counts[key] ?? 0) + 1;
    if (dryRun && counts[key] <= 3) console.log(`  ${key}: ${titleCase(row.COMPANY_NAME)} (${row.REGISTERED_STATE})`);

    batch.push({
      cin,
      name: titleCase(row.COMPANY_NAME),
      service: match.service,
      categories: match.categories,
      city,
      state: clean(row.REGISTERED_STATE),
      address: clean(row.REGISTERED_OFFICE_ADDRESS),
      source: "mca",
      published: false,
      verified: false,
    });
    if (batch.length >= BATCH) await flush();
  }
}
await flush();

const matched = Object.values(counts).reduce((a, b) => a + b, 0);
console.log(`${dryRun ? "[dry run] " : ""}Read ${read} companies, ${matched} matched:`);
for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${v}`);
