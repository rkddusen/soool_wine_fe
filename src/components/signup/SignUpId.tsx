import { useRef, useState } from "react";
import { SignUpError } from "../../models/SignUpError";
import { validId } from "../../utils/signUpValidators";
import { SignUp } from "../../models/User";
import { useMutation } from "@tanstack/react-query";
import { getIdExists } from "../../utils/api";
import Loading from "/src/assets/loading.svg?react";

interface SignUpIdComponentProps {
  inputValue: { id: string };
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: keyof SignUp
  ) => void;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}

const SignUpId = ({
  inputValue,
  handleInputChange,
  setLevel,
}: SignUpIdComponentProps) => {
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
    console.log(response);
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
          <p className="mt-10 text-14 text-78-gray">
            4~16자의 영문, 숫자, -, _ 만 사용 가능합니다.
          </p>
          <div
            className={`flex items-center w-full px-15 mt-10 h-50 ${
              idFocus ? "border-black border-1.5" : "border-78-gray border"
            } rounded-5`}
          >
            <svg
              className={`shrink-0 ${
                idFocus ? "stroke-black" : "stroke-bb-gray"
              }`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 9.33333C12.2091 9.33333 14 7.54247 14 5.33333C14 3.12419 12.2091 1.33333 10 1.33333C7.79086 1.33333 6 3.12419 6 5.33333C6 7.54247 7.79086 9.33333 10 9.33333Z"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M2.32262 15.1643C3.00942 12.5593 5.61393 11.3333 8.22314 11.3333H11.7768C14.3861 11.3333 16.9906 12.5593 17.6774 15.1643C17.8181 15.6986 17.9307 16.2766 17.9944 16.8906C18.0578 17.5008 17.5715 18 16.9786 18H3.02141C2.42847 18 1.94222 17.5008 2.00556 16.8906C2.06932 16.2766 2.18179 15.6986 2.32262 15.1643Z"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={inputValue["id"]}
              onChange={(e) => handleInputChange(e, "id")}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              placeholder="아이디"
              className="w-full h-full mx-10 border-none outline-none"
            />
          </div>
          {error && (
            <p className="mt-10 text-red-500 text-14">{error.message}</p>
          )}
        </div>
      </div>
      <div
        onClick={loading ? undefined : nextLevel}
        className="flex flex-row items-center justify-center w-full mt-15 h-50 rounded-15 bg-49-gray hover:cursor-pointer"
      >
        {loading ? (
          <Loading />
        ) : (
          <span className="text-white text-16">다음 단계</span>
        )}
      </div>
    </>
  );
};

export default SignUpId;
