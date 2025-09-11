import { useAutoEmail } from "@/hooks/auth/useAutoEmail";
import { forwardRef } from "react";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSelectEmail: (email: string) => void;
  value: string;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ onSelectEmail, value, ...props }, ref) => {
    const { addressList } = useAutoEmail(value);
    return (
      <div className="relative w-full">
        <div className="px-15 h-50 rounded-5 my-10 border-(--gray-78) border focus-within:border-black focus-within:border-[1.5px] peer">
          <input
            ref={ref}
            value={value}
            type="text"
            {...props}
            className="w-full h-full border-none outline-hidden"
          />
        </div>
        <ul
          className={`absolute w-full bg-white z-1 max-h-100 overflow-y-auto shadow-(--shadow-base) ${
            addressList.length !== 0
              ? "peer-focus-within:block hidden"
              : "hidden"
          }`}
        >
          {addressList.map((v) => (
            <li
              key={v}
              onMouseDown={() => {
                onSelectEmail(v);
              }}
              className="p-12 hover:cursor-pointer hover:bg-(--gray-f0) text-14"
            >
              {v}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default EmailInput;
