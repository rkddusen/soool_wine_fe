// utils/validateFilter.ts
import { Filter } from "@/models/Filter";
import { FILTER_TASTE } from "@/constants/Filter";
import { TYPE_ARRAY } from "@/constants/Wine";
import { COUNTRY_ARRAY } from "@/constants/Country";

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
  const WineTypeValues = TYPE_ARRAY.map((item) => item.type);
  const TasteValues = Object.keys(FILTER_TASTE[0].level);
  const CountryValues = COUNTRY_ARRAY.map((item) => item.code);
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
