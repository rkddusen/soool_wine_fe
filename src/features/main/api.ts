import { TodayWineType } from "@/models/Wine";
import { wineInstance } from "@/utils/api";

interface TodayWineResponse {
  content: TodayWineType;
}

export const getTodayWines = async (): Promise<TodayWineType> => {
  const { data } = await wineInstance.get<TodayWineResponse>("/today");
  return data.content;
};
