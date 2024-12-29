import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

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
    <div className="flex flex-row items-center w-full h-full px-20 bg-white rounded-30">
      <div className="shrink-0">
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-main"
            d="M16.3965 12.3926C17.5684 11.5625 19.5312 10.1074 19.5312 6.2793C19.5312 3.18359 17.7246 0.419922 17.7246 0.419922H7.28516C7.28516 0.419922 5.47852 3.20312 5.47852 6.30859C5.47852 10.1367 7.44141 11.5918 8.60352 12.4219C9.95117 13.3789 12.002 15.2051 12.002 15.4883V23.1641H7.41211V24.4727H17.4609V23.1641H12.998V15.4883C12.998 15.1758 15.0488 13.3594 16.3965 12.3926ZM7.98828 1.42578H17.0215C17.4902 1.42578 18.5254 4.21875 18.5254 6.2793C18.5254 6.33789 18.5254 6.39648 18.5254 6.44531H6.47461C6.47461 6.39648 6.47461 6.34766 6.47461 6.30859C6.47461 4.24805 7.51953 2.24609 7.98828 1.42578Z"
          />
        </svg>
      </div>
      <div className="w-full h-full mx-10">
        <input
          onChange={(e) => handleSearchChange(e)}
          onKeyDown={handleKeyPress}
          value={search}
          className="w-full h-full outline-none"
          type="text"
          placeholder="마시고 싶은 와인이 있나요?"
        />
      </div>
      <div
        onClick={() => handleSearch()}
        className="shrink-0 hover:cursor-pointer"
      >
        <svg
          className="stroke-main"
          width="25"
          height="25"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.75 23.75C19.2728 23.75 23.75 19.2728 23.75 13.75C23.75 8.22715 19.2728 3.75 13.75 3.75C8.22715 3.75 3.75 8.22715 3.75 13.75C3.75 19.2728 8.22715 23.75 13.75 23.75Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.25 26.25L20.8125 20.8125"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
