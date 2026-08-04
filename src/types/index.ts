export type TourCategory = "real-estate" | "hospitality" | "retail";

export const tourCategoryLabels: Record<TourCategory, string> = {
  "real-estate": "Real Estate",
  hospitality: "Hospitality",
  retail: "Retail",
};

export type Tour = {
  id: string;
  title: string;
  category: TourCategory;
  location: string;
  sqm: number;
  summary: string;
  completedAt: string;
  featured: boolean;
};

export type Service = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export type TeamMember = {
  role: string;
  bio: string;
};
