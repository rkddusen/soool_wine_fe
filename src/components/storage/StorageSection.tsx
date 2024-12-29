import SearchBar from "../common/SearchBar";

const StorageSection = () => {
  return (
    <>
      <div className="w-full py-70 rounded-15 bg-lighter-main">
        <div className="mb-40 text-center">
          <span className="text-30">와인창고</span>
        </div>
        <div className="w-full px-20 mx-auto max-w-600 h-60">
          <div className="w-full h-full border-1 border-main rounded-30">
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default StorageSection;
