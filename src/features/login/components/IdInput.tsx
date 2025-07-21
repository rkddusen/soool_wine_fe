// IdInput.tsx
import { forwardRef } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

interface IdInputProps {
  idInput: string;
  onChangeId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (
    event: React.KeyboardEvent<HTMLInputElement>,
    field?: "id"
  ) => void;
}

const IdInput = forwardRef<HTMLInputElement, IdInputProps>(
  ({ idInput, onChangeId, onKeyDown }, ref) => {
    return (
      <div
        className="flex flex-row-reverse items-center gap-10 w-full px-15 mb-10 h-50 rounded-5
        border-(--gray-78) border
        focus-within:border-black focus-within:border-[1.5px]"
      >
        <input
          ref={ref}
          type="text"
          value={idInput}
          onChange={onChangeId}
          onKeyDown={(e) => onKeyDown(e, "id")}
          placeholder="아이디"
          className="w-full h-full border-none outline-hidden peer"
        />
        <UserIcon className="w-20 h-20 shrink-0 stroke-(--gray-bb) peer-focus:stroke-black" />
      </div>
    );
  }
);

export default IdInput;
