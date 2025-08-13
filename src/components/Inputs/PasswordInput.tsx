import { forwardRef, useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const PasswordInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  const [seePassword, setSeePassword] = useState<boolean>(false);
  return (
    <div
      className="flex flex-row-reverse items-center gap-10 w-full my-10 px-15 h-50 rounded-5
        border-(--gray-78) border
        focus-within:border-black focus-within:border-[1.5px]"
    >
      {seePassword ? (
        <EyeIcon
          onClick={() => setSeePassword(false)}
          className="w-20 h-20 hover:cursor-pointer"
        />
      ) : (
        <EyeSlashIcon
          onClick={() => setSeePassword(true)}
          className="w-20 h-20 hover:cursor-pointer stroke-(--gray-bb)"
        />
      )}
      <input
        ref={ref}
        type={seePassword ? "text" : "password"}
        {...props}
        className="w-full h-full border-none outline-hidden peer"
      />
      <LockClosedIcon className="w-20 h-20 shrink-0 peer-focus:stroke-black stroke-(--gray-bb)" />
    </div>
  );
});

export default PasswordInput;
