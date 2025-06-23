import SearchArea from "../components/main/SearchArea";
import WineType from "../components/main/WineType";
import RandomWine from "../components/main/RandomWine";
import MainCity from "../components/main/MainCity";

const MainPage = () => {
  return (
    <main className="w-full">
      <SearchArea />
      <WineType />
      {/* <RandomWine /> */}
      <MainCity />
    </main>
  );
};

export default MainPage;
