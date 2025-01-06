import { Filter } from "../models/Filter";
import { Country } from "../models/Wine";

export const validateFilterKey = (
  filter: Filter,
  key: keyof Filter,
  allowedValues: number[]
): boolean => {
  if (filter[key]) {
    const validValues = filter[key].filter((v) => allowedValues.includes(v));
    if (filter[key].length === validValues.length) {
      return true;
    } else {
      filter[key] = validValues;
      return false;
    }
  }
  return true;
};

type AllowedFilterKeys = keyof Filter;
export const validateFilter = (filter: Filter): boolean => {
  const allowedValues: Record<AllowedFilterKeys, number[]> = {
    type: [0, 1, 2, 3, 4],
    sweetness: [1, 2, 3, 4, 5],
    acidity: [1, 2, 3, 4, 5],
    body: [1, 2, 3, 4, 5],
    tannin: [1, 2, 3, 4, 5],
    country: Array.from({ length: Country.size }, (_, i) => i),
  };

  return Object.keys(filter).every((key) =>
    validateFilterKey(
      filter,
      key as keyof Filter,
      allowedValues[key as keyof typeof allowedValues]
    )
  );
};
