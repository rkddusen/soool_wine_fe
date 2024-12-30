import { useEffect, useState } from "react";
import SearchBar from "../common/SearchBar";
import { WineWithWinery } from "../../models/Wine";
import NoResultsFound from "/src/assets/noResultsFound.svg?react";
import { AxiosResponse } from "axios";
import { WineApiResponse } from "../../models/Api";
import { getWine } from "../../utils/api";
import { useSearchParams } from "react-router-dom";
import WineListBox from "./WineListBox";

const StorageSection = () => {
  const [wineList, setWineList] = useState<WineWithWinery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const getWineData = async (pageIndex: number, search: string | null) => {
    try {
      const response: AxiosResponse<WineApiResponse> = await getWine(
        pageIndex,
        search
      );
      setWineList((prev) => [...prev, ...response.data.content]);
      setTotalElements(response.data.totalElements);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("Error getWineData");
      console.log("Error getWineData: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setWineList([]);
    setPage(1);
    getWineData(page, searchParams.get("search"));
  }, [searchParams]);

  const handleViewMore = (): void => {
    if (page + 1 <= totalPages) {
      setPage(page + 1);
      getWineData(page + 1, searchParams.get("search"));
    }
  };

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
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
      <div className="w-full">
        <div className="w-full pt-10">
          <div className="flex flex-row items-center justify-between w-full px-10 mx-auto h-60">
            <span className="text-14 text-78-gray">{totalElements} Wines</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-full gap-40">
          {wineList.length > 0 ? (
            wineList.map((w, i) => <WineListBox key={i} wine={w} />)
          ) : (
            <div className="flex flex-col items-center gap-20 my-100">
              <NoResultsFound />
              <p className="text-78-gray text-18">
                앗! 찾으시는 와인이 없네요.
              </p>
            </div>
          )}
        </div>
      </div>
      {page + 1 <= totalPages ? (
        <div className="w-full text-center mt-50">
          <div
            onClick={handleViewMore}
            className="inline-block border rounded-full border-78-gray hover:cursor-pointer"
          >
            <div className="py-10 px-30 text-12">더보기</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default StorageSection;
