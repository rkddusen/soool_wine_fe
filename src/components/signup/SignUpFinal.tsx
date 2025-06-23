import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUsers } from "../../utils/api";
import { SignUp } from "../../models/User";
import LoadingWhite from "/src/assets/LoadingWhite.svg?react";
import { SignUpError } from "../../models/SignUpError";

interface SignUpFinalProps {
  user: SignUp;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  handlePrevLevel: () => void;
}
const SignUpFinal = ({ user, setLevel, handlePrevLevel }: SignUpFinalProps) => {
  const [error, setError] = useState<SignUpError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const callPostCode = async (): Promise<void> => {
    await postUsers(user["id"], user["password"], user["email"]);
  };
  const mutation = useMutation<void, Error>({
    mutationFn: callPostCode,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      queryClient.setQueryData(["isSignUpSuccess"], true);
      setLevel(6);
    },
    onError: (error: Error) => {
      console.log("Error post user:", error);
      setError({
        code: "5001",
        message: "문제가 발생했습니다. 다시 시도해주세요.",
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
  const nextLevel = () => {
    if (user["id"] === "test") {
      queryClient.setQueryData(["isSignUpSuccess"], true);
      setLevel(6);
      return;
    }
    mutation.mutate();
  };
  return (
    <>
      <div className="w-full">
        <div className="text-center">
          <p className="pt-10 font-bold text-22">인증되었습니다!</p>
          <p className="mb-15 mt-15 text-16">아이디 : {user["id"]}</p>
          <p className="mb-15 mt-15 text-16">이메일 : {user["email"]}</p>
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
            <span className="text-white">회원가입하기</span>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUpFinal;
