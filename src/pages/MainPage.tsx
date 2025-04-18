import MainWinery from "../components/main/MainWinery";
import RandomWine from "../components/main/RandomWine";
import SearchArea from "../components/main/SearchArea";
import WineType from "../components/main/WineType";

const MainPage = () => {
  return (
    <main className="w-full px-20 mx-auto md:px-40 max-w-1280">
      <SearchArea />
      <WineType />
      <RandomWine />
      <MainWinery />
    </main>
  );
};

export default MainPage;
