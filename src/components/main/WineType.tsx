import { Link } from "react-router-dom";

const WINETYPE = [
  { type: "Red", fill: "fill-(--red-wine)" },
  { type: "White", fill: "fill-(--white-wine)" },
  { type: "Rose", fill: "fill-(--rose-wine)" },
  { type: "Sparkling", fill: "fill-(--sparkling-wine)" },
];

const WineType = () => {
  return (
    <section className="flex flex-row items-start justify-center w-full my-30">
      {WINETYPE.map((_, i) => (
        <div
          key={i}
          className="w-full overflow-hidden text-center px-15 sm:px-20 sm:max-w-150 max-w-100"
        >
          <div className="mx-auto group hover:cursor-pointer">
            <Link to={`/storage?type=${i}`}>
              <WineTypeBtn id={i} />
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

interface WineTypeBtnComponentProps {
  id: number;
}

const WineTypeBtn = ({ id }: WineTypeBtnComponentProps) => {
  return (
    <>
      <div className="relative rounded-full w-full pb-[100%]">
        <div
          className={`flex justify-center items-center absolute top-0 left-0 w-full h-full rounded-full ${WINETYPE[id].fill} group-hover:bg-(--gray-f5) bg-white overflow-hidden`}
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
      <p className="flex justify-center mt-10 mb-5 text-12 sm:text-14 md:text-16 group-hover:font-medium">
        {WINETYPE[id].type}
      </p>
    </>
  );
};

export default WineType;
