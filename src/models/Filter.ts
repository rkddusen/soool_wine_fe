export interface Filter {
  type: string[] | null;
  sweetness: string[] | null;
  acidity: string[] | null;
  body: string[] | null;
  tannin: string[] | null;
  country: string[] | null;
}

export interface FilterTaste {
  taste: keyof Filter;
  kr: string;
  level: {
    low: string;
    medium: string;
    high: string;
  };
}
