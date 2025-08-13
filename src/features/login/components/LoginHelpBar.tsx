// LoginHelpBar.tsx
import { Link } from "react-router-dom";

const LoginHelpBar = () => {
  return (
    <ul className="mt-10 text-14">
      <li className="inline-block mt-5 pr-15 hover:underline break-keep">
        <Link to="/login/help">아이디 찾기</Link>
      </li>
      <li className="mt-5 inline-block px-15 border-l hover:underline break-keep border-l-(--gray-78)">
        <Link to="/login/help?lhTab=2">비밀번호 찾기</Link>
      </li>
      <li className="mt-5 inline-block pl-15 hover:underline break-keep border-l border-l-(--gray-78)">
        <Link to="/signup">회원가입</Link>
      </li>
    </ul>
  );
};

export default LoginHelpBar;
