import { useAuthStore } from "@/stores/authStore";
import EmailChange from "./EmailChange";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const AccountSetting = () => {
  const { user } = useAuthStore();
  return (
    <div className="mt-50 px-20 mx-auto md:px-40 max-w-1280">
      <p className="text-24 md:text-32">
        <span className="font-medium">{user!.id}</span> 님 환영합니다!
      </p>
      {/* 이메일 수정 */}
      <EmailChange />
      {/* 비밀번호 수정 */}
      <div className="border border-(--gray-e0) rounded-15 p-30 mt-20 hover:cursor-pointer">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">비밀번호 수정</p>
          </div>
          <ChevronDownIcon className="w-24 h-24" />
        </div>
      </div>
      {/* 회원 탈퇴 */}
      <div className="mt-20 pl-20 inline-flex items-center hover:cursor-pointer">
        <p className="text-14">회원 탈퇴</p>
        <ChevronRightIcon className="w-14 h-14" />
      </div>
    </div>
  );
};

export default AccountSetting;
