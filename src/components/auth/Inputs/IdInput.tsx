// components/Auth/Input/IdInput.tsx
import { forwardRef } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

const IdInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return (
    <div
      className="flex flex-row-reverse items-center gap-10 w-full px-15 mb-10 mt-10 h-50 rounded-5
        border-(--gray-78) border
        focus-within:border-black focus-within:border-[1.5px]"
    >
      <input
        ref={ref}
        type="text"
        {...props}
        className="w-full h-full border-none outline-hidden peer"
      />
      <UserIcon className="w-20 h-20 shrink-0 stroke-(--gray-bb) peer-focus:stroke-black" />
    </div>
  );
});

export default IdInput;
