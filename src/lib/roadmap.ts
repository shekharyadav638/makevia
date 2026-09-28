export const SERVICES = {
  formulation: "Product formulation",
  manufacturing: "Manufacturing",
  packaging: "Packaging",
  testing: "Testing & compliance",
  logistics: "Logistics",
} as const;

export const CATEGORIES = {
  food_beverage: "Food & Beverage",
  skincare_beauty: "Skincare & Beauty",
  supplements: "Supplements",
  furniture: "Furniture",
  consumer_products: "Consumer Products",
  other: "Other",
} as const;

export type Service = keyof typeof SERVICES;
export type Category = keyof typeof CATEGORIES;

export type RoadmapStep = {
  title: string;
  description: string;
  service: Service | "none";
  requirements: string[];
  estimated_cost: string;
  estimated_time: string;
};

export type Roadmap = {
  supported: boolean;
  unsupported_reason: string;
  product_name: string;
  category: Category;
  summary: string;
  steps: RoadmapStep[];
};

export type Provider = {
  id: number;
  name: string;
  service: Service;
  city: string | null;
  state: string | null;
  description: string | null;
  website: string | null;
  verified: boolean;
};

export const IDEA_MIN = 3;
export const IDEA_MAX = 300;

export function groupProviders(providers: Provider[], perService = 3): Partial<Record<Service, Provider[]>> {
  const groups: Partial<Record<Service, Provider[]>> = {};
  for (const p of providers) {
    const list = (groups[p.service] ??= []);
    if (list.length < perService) list.push(p);
  }
  return groups;
}
