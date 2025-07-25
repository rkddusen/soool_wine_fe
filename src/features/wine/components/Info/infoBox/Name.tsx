// Info/infoBox/Name.tsx
// 와인 이름
interface NameProps {
  ename: string;
  kname: string;
  abv: number | null;
}
const Name = ({ ename, kname, abv }: NameProps) => {
  return (
    <div className="bg-white rounded-15 p-20 leading-[1.5]">
      <p className="text-24 font-light">{ename}</p>
      <p>{kname}</p>
      <p className="text-(--gray-78) text-14">{abv && "도수: " + abv + "%"}</p>
    </div>
  );
};

export default Name;
