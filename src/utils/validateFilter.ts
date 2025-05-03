import { Filter } from "@/models/Filter";
import { FILTER_TYPE_ARRAY, FILTER_TASTE, FILTER_COUNTRY } from "@/data/Filter";

export const validateFilterKey = (
  filter: Filter,
  key: keyof Filter,
  allowedValues: string[]
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
  const WineTypeValues = FILTER_TYPE_ARRAY.map((item) => item.type);
  const TasteValues = Object.keys(FILTER_TASTE[0].level);
  const CountryValues = FILTER_COUNTRY.map((item) => item.country);
  const allowedValues: Record<AllowedFilterKeys, string[]> = {
    type: WineTypeValues,
    sweetness: TasteValues,
    acidity: TasteValues,
    body: TasteValues,
    tannin: TasteValues,
    country: CountryValues,
  };

  return Object.keys(filter).every((key) =>
    validateFilterKey(
      filter,
      key as keyof Filter,
      allowedValues[key as keyof typeof allowedValues]
    )
  );
};
