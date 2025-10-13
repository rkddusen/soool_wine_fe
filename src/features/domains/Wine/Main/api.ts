// Main/api.ts
import { TodayWineType } from "@/models/Wine";
import { wineInstance } from "@/apis/instance";

interface TodayWineResponse {
  content: TodayWineType;
}

export const getTodayWines = async (): Promise<TodayWineType> => {
  const { data } = await wineInstance.get<TodayWineResponse>("/today");
  return data.content;
};
