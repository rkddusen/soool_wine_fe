import MainWinery from "../components/main/MainWinery";
import RandomWine from "../components/main/RandomWine";
import SearchArea from "../components/main/SearchArea";
import WineType from "../components/main/WineType";

const MainPage = () => {
  return (
    <>
      <SearchArea />
      <WineType />
      <RandomWine />
      <MainWinery />
    </>
  );
};

export default MainPage;
