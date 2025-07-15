// Info/infoBox/Image.tsx
// 와인 이미지
interface ImageProps {
  image: string | null;
  ename: string;
}

const Image = ({ image, ename }: ImageProps) => {
  return (
    <div className="flex items-center justify-center w-full bg-white rounded-15">
      <img src={image || ""} alt={ename} />
    </div>
  );
};

export default Image;
