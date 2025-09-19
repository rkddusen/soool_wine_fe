// components/Auth/Input/CodeInput.tsx
import { forwardRef } from "react";

interface CodeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isDisabled?: boolean;
  seconds: number;
  handleKeyDownEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CodeInput = forwardRef<HTMLInputElement, CodeInputProps>(
  ({ isDisabled, seconds, handleKeyDownEnter, ...props }, ref) => {
    // 숫자 input특성 상 지수 표기법이나 +/- 기호가 허용되기 때문에 이를 막음
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (["e", "E", "+", "-"].includes(e.key)) {
        e.preventDefault();
      }
      handleKeyDownEnter(e);
    };

    return (
      <div className="w-full my-10 flex items-center h-50 px-15 border border-(--gray-78) focus-within:border-black rounded-5">
        <input
          ref={ref}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          onKeyDown={handleKeyDown}
          {...props}
          disabled={isDisabled}
          className="w-full h-full border-none outline-hidden [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span
          className={`text-red-500 text-14 shrink-0 text-nowrap ${
            isDisabled && "hidden"
          }`}
        >
          {String(Math.floor(seconds / 60)).padStart(2, "0")}:
          {String(seconds % 60).padStart(2, "0")}
        </span>
      </div>
    );
  }
);

export default CodeInput;
