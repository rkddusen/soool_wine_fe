import SearchBar from "../common/SearchBar";

const SearchArea = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full px-20 mx-auto md:px-40 max-w-1280">
      <div className="text-center md:text-84 sm:text-64 text-48 font-display text-(--main) sm:pt-70 sm:pb-50 pt-50 pb-20">
        <p>What a Wonderful</p>
        <p>Wine</p>
      </div>
      <div className="flex flex-row items-center w-full h-55 max-w-500">
        <div className="w-full h-full rounded-30 border border-(--main)">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default SearchArea;
