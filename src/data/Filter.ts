import { Country } from "@/models/Wine";

export const TYPE = ["red", "white", "rose", "sparkling", "etc"];
export const COUNTRY = Array.from(Country, ([key, value]) => ({
  country: key,
  ...value,
}));
