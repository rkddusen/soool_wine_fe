import SearchBar from "../common/SearchBar";

const SearchArea = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div className="text-center md:text-84 sm:text-64 text-54 font-display text-(--main) md:py-70 sm:py-50 py-30">
        <p>What a Wonderful</p>
        <p>Wine</p>
      </div>
      <div className="flex flex-row items-center w-full h-60 max-w-500">
        <div className="w-full h-full border rounded-30 border-(--main)">
          <SearchBar />
        </div>
      </div>
    </section>
  );
};

export default SearchArea;
