import { useRef } from "react";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const idRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const handleMember = () => {
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      alert("아이디를 입력해주세요");
      idRef.current.focus();
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      alert("비밀번호를 입력해주세요");
      idRef.current.focus();
    }
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idRef.current.value,
        pw: pwRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.code);
        if (data.code === 400) {
          alert("아이디와 비밀번호를 확인해주세요");
        }
        if (data.code === 100) {
          alert("반갑습니다 관리자님");
          const user = JSON.stringify(data);
          localStorage.setItem("user", user);
          navigate("/adminpage");
        }
        if (data.code === 200) {
          const user = JSON.stringify(data);
          localStorage.setItem("user", user);
          alert("로그인성공");
          navigate("/");
        }
      });
  };

  return (
    <div className="back">
      <div className="loginbox">
        <form>
          <div className="logo">
            <p>안방</p>
          </div>
          <input
            type="text"
            placeholder="아이디"
            className="in"
            name="id"
            defaultValue=""
            ref={idRef}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="in"
            name="pw"
            defaultValue=""
            ref={pwRef}
          />
          <input
            type="button"
            id="logbtn"
            value="로그인"
            onClick={handleMember}
          />
        </form>
        <Link className="link" to="/login/modify">
          <p className="log_p">회원가입</p>
        </Link>
        <Link className="link" to="/login/find">
          <p className="log_p">비밀번호를 잊어버리셨나요?</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
