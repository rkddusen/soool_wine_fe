import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "../../models/Api";
import { postUsers } from "../../utils/api";
import { AxiosResponse } from "axios";
import { SignUp } from "../../models/User";
import Loading from "/src/assets/loading.svg?react";
import { SignUpError } from "../../models/SignUpError";

interface SignUpFinalComponentProps {
  user: SignUp;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}
const SignUpFinal = ({ user, setLevel }: SignUpFinalComponentProps) => {
  const [error, setError] = useState<SignUpError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const callPostCode = async (): Promise<ApiResponse> => {
    const response: AxiosResponse<ApiResponse> = await postUsers(
      user["id"],
      user["password"],
      user["email"] + "@" + user["address"]
    );
    return response.data;
  };
  const mutation = useMutation<ApiResponse, Error>({
    mutationFn: callPostCode,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data: ApiResponse) => {
      console.log("user post successfully:", data);
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
    mutation.mutate();
  };
  return (
    <>
      <div className="w-full">
        <div className="text-center">
          <p className="pt-10 font-bold text-22">인증되었습니다!</p>
          <p className="mb-15 mt-15 text-16">아이디 : {user["id"]}</p>
          <p className="mb-15 mt-15 text-16">
            이메일 : {user["email"]}@{user["address"]}
          </p>
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
          <span className="text-white text-16">회원가입하기</span>
        )}
      </div>
    </>
  );
};

export default SignUpFinal;
