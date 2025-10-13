// Main/index.tsx
// 메인 페이지
import { SearchArea, WineType, TodayWine, MainCity } from "./components";

const Main = () => {
  return (
    <main className="w-full">
      <SearchArea />
      <WineType />
      <TodayWine />
      <MainCity />
    </main>
  );
};

export default Main;
