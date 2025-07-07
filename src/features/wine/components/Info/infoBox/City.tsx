// Info/infoBox/City.tsx
// 와인 생산 도시
interface Props {
  region: string;
  city: string | null;
  winery: string;
}
const City = ({ region, city, winery }: Props) => {
  const wineryList = [region, city, winery].filter((v) => !!v);
  return (
    <div className="bg-white rounded-15 p-20 leading-[1.5]">
      <p className="font-bold">와이너리</p>
      <p className="flex flex-wrap">
        {wineryList.map((v, i) => (
          <span key={i}>
            {i !== 0 && <span>&nbsp;&gt;&nbsp;</span>}
            {v}
          </span>
        ))}
      </p>
    </div>
  );
};

export default City;
