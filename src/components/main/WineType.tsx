import { Link } from "react-router-dom";

const WineType = () => {
  const WINETYPE = ["레드", "화이트", "로제", "스파클링"];
  const WINECOLOR = [
    "fill-red-wine",
    "fill-white-wine",
    "fill-rose-wine",
    "fill-sparkling-wine",
  ];

  return (
    <div className="flex flex-row flex-wrap items-start justify-center w-full gap-y-30 my-70">
      {WINETYPE.map((v, i) => (
        <div
          key={i}
          className="w-1/2 md:w-1/4 md:max-w-200 sm:max-w-300 max-w-200 min-w-90"
        >
          <div className="group relative mx-auto text-center max-w-100 sm:max-w-120 px-10 sm:w-120 hover:cursor-pointer">
            <Link to={`/storage?type=${i}`}>
              <WineTypeBtn type={v} color={WINECOLOR[i]} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

interface WineTypeBtnComponentProps {
  type: string;
  color: string;
}

const WineTypeBtn = ({ type, color }: WineTypeBtnComponentProps) => {
  return (
    <>
      <div className="relative rounded-full w-full pb-[100%]">
        <div
          className={`flex justify-center items-center absolute top-0 left-0 w-full h-full rounded-full ${color} group-hover:bg-f0-gray bg-f5-gray`}
        >
          <svg
            className="h-24 w-18 sm:h-40 sm:w-30"
            viewBox="0 0 36 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M35.8356 3.865V2C35.8356 1.46957 35.646 0.96086 35.3084 0.585787C34.9709 0.210714 34.5132 0 34.0359 0H1.96513C1.48782 0 1.03006 0.210714 0.692546 0.585787C0.355036 0.96086 0.165425 1.46957 0.165425 2V3.865C0.0012024 5.28625 -0.920022 15.2075 4.31937 21.9513C7.11678 25.5513 11.1088 27.5575 16.2008 27.9338V44H7.20227C6.72496 44 6.2672 44.2107 5.92969 44.5858C5.59218 44.9609 5.40257 45.4696 5.40257 46C5.40257 46.5304 5.59218 47.0391 5.92969 47.4142C6.2672 47.7893 6.72496 48 7.20227 48H28.7987C29.276 48 29.7338 47.7893 30.0713 47.4142C30.4088 47.0391 30.5984 46.5304 30.5984 46C30.5984 45.4696 30.4088 44.9609 30.0713 44.5858C29.7338 44.2107 29.276 44 28.7987 44H19.8002V27.9338C24.8922 27.5588 28.8842 25.5513 31.6816 21.9513C36.921 15.2075 35.9975 5.28625 35.8356 3.865ZM3.74459 4.29125C3.75808 4.19489 3.76485 4.09752 3.76483 4H32.2362C32.2361 4.09752 32.2429 4.19489 32.2564 4.29125C32.4507 6.18804 32.4507 8.10321 32.2564 10H3.75134C3.55709 8.10334 3.55483 6.18847 3.74459 4.29125Z" />
          </svg>
        </div>
      </div>
      <div className="mt-10 text-14 md:text-16 group-hover:font-semibold">
        <span>{type} 와인</span>
      </div>
    </>
  );
};

export default WineType;
