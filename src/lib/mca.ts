import type { Category, Service } from "./roadmap.ts";

export type McaMatch = { service: Service; categories: Category[] };

type Rule = { codes: string[]; activity?: string; name?: RegExp } & McaMatch;

const rules: Rule[] = [
  { codes: ["15", "10", "11"], activity: "Food stuffs", service: "manufacturing", categories: ["food_beverage"] },
  { codes: ["2423", "2100"], activity: "Chemicals", service: "manufacturing", categories: ["supplements"] },
  { codes: ["2424", "2023"], activity: "Chemicals", service: "manufacturing", categories: ["skincare_beauty"] },
  { codes: ["361", "3100"], activity: "Manufacturing", service: "manufacturing", categories: ["furniture"] },
  { codes: ["2102", "1702", "2221", "1811", "2220"], activity: "Manufacturing", service: "packaging", categories: [] },
  { codes: ["2520"], activity: "Manufacturing", name: /PLAST|POLY|PACK|CONTAIN/, service: "packaging", categories: [] },
  { codes: ["7422", "7120"], activity: "Business Services", service: "testing", categories: [] },
  { codes: ["6302", "6023", "5210", "4923"], activity: "Transport", service: "logistics", categories: [] },
];

const NOT_A_MAKER = /INFOTE(CH|K)|INFRA|SOFTWARE|FINAN|REALT|ESTATE|CONSULT|CAPITAL|INVEST|HOLDING|SECURITIES|LEASING|WEBNET|BUILDER|DEVELOPER/;

export function classify(cin: string, activity: string, name: string): McaMatch | null {
  if (NOT_A_MAKER.test(name.toUpperCase())) return null;
  const code = cin.slice(1, 6);
  const rule = rules.find(
    (r) =>
      r.codes.some((c) => code.startsWith(c)) &&
      (!r.activity || activity.includes(r.activity)) &&
      (!r.name || r.name.test(name.toUpperCase())),
  );
  return rule ? { service: rule.service, categories: rule.categories } : null;
}

export function parseCsvLine(line: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') cell += line[++i];
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      cells.push(cell);
      cell = "";
    } else cell += ch;
  }
  cells.push(cell);
  return cells;
}

const KEEP_UPPER = new Set(["LLP", "OPC", "(INDIA)", "(I)", "II", "III"]);

export function titleCase(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => (KEEP_UPPER.has(w) ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(" ");
}

const NCR_CITIES: [RegExp, string][] = [
  [/\b(GURGAON|GURUGRAM|MANESAR)\b/, "Gurugram"],
  [/\bFARIDABAD\b/, "Faridabad"],
  [/\b(SONIPAT|SONEPAT|KUNDLI)\b/, "Sonipat"],
  [/\bBAHADURGARH\b/, "Bahadurgarh"],
  [/\bGREATER\s*NOIDA\b/, "Greater Noida"],
  [/\b(NOIDA|GAUTAM\s*BUDDHA?\s*NAGAR)\b/, "Noida"],
  [/\b(GHAZIABAD|SAHIBABAD|INDIRAPURAM)\b/, "Ghaziabad"],
];

export function ncrCity(state: string, address: string): string | null {
  if (/^(NCT OF )?DELHI$/i.test(state.trim())) return "Delhi";
  const upper = address.toUpperCase();
  return NCR_CITIES.find(([re]) => re.test(upper))?.[1] ?? null;
}
