import { Link } from "react-router-dom";
import { WINETYPE_ARRAY } from "@/data/Wine";
import WineIcon from "@/assets/WineIcon.svg?react";

const WineType = () => {
  return (
    <section className="flex flex-row items-start justify-center w-full px-20 mx-auto mt-30 md:px-40 max-w-1280">
      {WINETYPE_ARRAY.map(
        (v) =>
          v.type !== "etc" && (
            <div
              key={v.type}
              className="w-full overflow-hidden text-center px-15 sm:px-20 sm:max-w-150 max-w-100"
            >
              <div className="mx-auto group hover:cursor-pointer">
                <Link to={`/storage?type=${v.type}`}>
                  <WineTypeBtn label={v.label} fill={v.fill} />
                </Link>
              </div>
            </div>
          )
      )}
    </section>
  );
};

interface WineTypeBtnComponentProps {
  label: string;
  fill: string;
}

const WineTypeBtn = ({ label, fill }: WineTypeBtnComponentProps) => {
  return (
    <>
      <div className="relative rounded-full w-full pb-[100%]">
        <div
          className={`flex justify-center items-center absolute top-0 left-0 w-full h-full rounded-full ${fill} group-hover:bg-(--gray-f5) bg-white overflow-hidden`}
        >
          <WineIcon className="h-24 w-18 sm:h-40 sm:w-30" />
        </div>
      </div>
      <p className="flex justify-center mt-10 mb-5 text-12 sm:text-14 md:text-16 group-hover:font-medium">
        {label}
      </p>
    </>
  );
};

export default WineType;
