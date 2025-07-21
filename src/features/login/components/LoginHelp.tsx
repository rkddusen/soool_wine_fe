// LoginHelp.tsx
import { Link } from "react-router-dom";

const LoginHelp = () => {
  return (
    <ul className="mt-10 text-14">
      <li className="inline-block mt-5 pr-15 hover:underline break-keep">
        아이디 찾기
      </li>
      <li className="mt-5 inline-block px-15 border-l hover:underline break-keep border-l-(--gray-78)">
        비밀번호 찾기
      </li>
      <li className="mt-5 inline-block pl-15 hover:underline break-keep border-l border-l-(--gray-78)">
        <Link to="/signup">회원가입</Link>
      </li>
    </ul>
  );
};

export default LoginHelp;
