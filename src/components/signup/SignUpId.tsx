import { useRef, useState } from "react";
import { SignUpError } from "../../models/SignUpError";
import { validId } from "../../utils/signUpValidators";
import { SignUp } from "../../models/User";
import { useMutation } from "@tanstack/react-query";
import { getIdExists } from "../../utils/api";
import LoadingWhite from "/src/assets/LoadingWhite.svg?react";
import { UserIcon } from "@heroicons/react/24/outline";

interface SignUpIdProps {
  inputValue: { id: string };
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof SignUp
  ) => void;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  handlePrevLevel: () => void;
}

const SignUpId = ({
  inputValue,
  handleInputChange,
  setLevel,
  handlePrevLevel,
}: SignUpIdProps) => {
  const [idFocus, setIdFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<SignUpError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnFocus = (): void => {
    setIdFocus(true);
    setError(null);
  };
  const handleOnBlur = (): void => {
    setIdFocus(false);
  };

  const callGetIsIdExists = async (id: string): Promise<boolean> => {
    const response: boolean = await getIdExists(id);
    return response;
  };

  const mutation = useMutation<boolean, Error, string>({
    mutationFn: callGetIsIdExists,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (exists: boolean) => {
      if (!exists) {
        setLevel(2);
      } else {
        setError({
          code: "1003",
          message: "이미 존재하는 아이디입니다.",
        });
      }
    },
    onError: (error: Error) => {
      console.log("Error get id exists:", error);
      setError({
        code: "1004",
        message: "문제가 발생했습니다. 다시 시도해주세요.",
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const nextLevel = () => {
    if (inputValue["id"] === "test") {
      setLevel(2);
      return;
    }
    const _error = validId(inputValue["id"]);
    if (_error) {
      setError(_error);
    } else {
      mutation.mutate(inputValue["id"]);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-15">
          <p className="font-bold text-20">아이디를 입력해주세요!</p>
          <p className="mt-10 text-14 text-(--gray-78)">
            4~16자의 영문, 숫자, -, _ 만 사용 가능합니다.
          </p>
          <div
            className={`flex items-center w-full px-15 mt-10 h-50 ${
              idFocus
                ? "border-black border-[1.5px]"
                : "border-(--gray-78) border"
            } rounded-5`}
          >
            <UserIcon
              className={`w-20 h-20 shrink-0 ${
                idFocus ? "stroke-black" : "stroke-(--gray-bb)"
              }`}
            />
            <input
              ref={inputRef}
              type="text"
              value={inputValue["id"]}
              onChange={(e) => handleInputChange(e, "id")}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              placeholder="아이디"
              className="w-full h-full mx-10 border-none outline-hidden"
            />
          </div>
          {error && (
            <p className="mt-10 text-red-500 text-14">{error.message}</p>
          )}
        </div>
      </div>
      <div className="flex gap-10 mt-20 h-50">
        <div
          onClick={handlePrevLevel}
          className="flex flex-1 items-center justify-center rounded-15 border border-(--gray-49) hover:cursor-pointer"
        >
          <span>이전</span>
        </div>
        <div
          onClick={loading ? undefined : nextLevel}
          className="flex flex-3 items-center justify-center rounded-15 bg-(--gray-49) hover:cursor-pointer"
        >
          {loading ? (
            <LoadingWhite />
          ) : (
            <span className="text-white">다음</span>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUpId;
