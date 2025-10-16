// components/SearchBar.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchLogoIcon from "@/assets/SearchLogoIcon.svg?react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      if (location.pathname === "/") {
        navigate(`/storage?search=${trimmedSearch}`);
      } else {
        searchParams.set("search", trimmedSearch);
        const sortedParams = new URLSearchParams(
          Array.from(searchParams.entries()).sort((a, b) =>
            a[0].localeCompare(b[0])
          )
        );
        setSearchParams(sortedParams);
      }
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const nowSearch = searchParams.get("search");
    if (nowSearch) {
      setSearch(nowSearch);
    } else {
      setSearch("");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-row items-center w-full h-full px-20 bg-white">
      <div className="shrink-0">
        <SearchLogoIcon className="w-25 h-25 fill-(--main)" />
      </div>
      <div className="w-full h-full mx-10">
        <input
          onChange={(e) => handleSearchChange(e)}
          onKeyDown={handleKeyPress}
          value={search}
          className="w-full h-full outline-hidden"
          type="text"
          placeholder="마시고 싶은 와인이 있나요?"
        />
      </div>
      <div
        onClick={() => handleSearch()}
        className="shrink-0 hover:cursor-pointer"
      >
        <MagnifyingGlassIcon className="w-24 h-24 stroke-(--main)" />
      </div>
    </div>
  );
};

export default SearchBar;
