import { CheckIcon } from "@heroicons/react/24/outline";

interface LevelBarProps {
  level: number;
}

const LevelBar = ({ level }: LevelBarProps) => {
  return (
    <div className="relative w-full mt-30">
      <div className="absolute z-1 top-12 bottom-12 left-15 right-15">
        <div
          className="h-full rounded-full bg-(--gray-49) transition-all duration-500"
          style={{
            width: `${level === 6 ? 100 : 25 * (level - 1)}%`,
          }}
        ></div>
      </div>
      <div className="relative flex justify-between w-full z-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`flex items-center justify-center w-30 h-30 border rounded-full border-(--gray-49) text-12 ${
              level >= i + 1
                ? "bg-(--gray-49) text-white"
                : "sm:bg-white text-(--gray-49)"
            }`}
          >
            {level > i + 1 ? (
              <CheckIcon className="w-16 h-16" />
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelBar;
