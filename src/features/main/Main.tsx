// features/main/Main.tsx
// 메인 페이지
import { SearchArea } from "@/components";
import { WineType, TodayWine, MainCity } from "./components";

const Main = () => {
  return (
    <main className="w-full">
      <SearchArea pageTitle={["What a Wonderful", "Wine"]} />
      <WineType />
      {/* <TodayWine /> */}
      <MainCity />
    </main>
  );
};

export default Main;
