import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/modify.css";
import $ from "jquery";

const Modify = () => {
  const nameRef = useRef();
  const idRef = useRef();
  const pw1Ref = useRef();
  const pw2Ref = useRef();
  const email1Ref = useRef();
  const email2Ref = useRef();
  const rnameRef = useRef();
  const navigate = useNavigate();

  let isClick = false;
  const handleCheck = () => {
    console.log("클릭");
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      alert("아이디를 먼저 입력해주세요");
      idRef.current.focus();
      return false;
    }
    fetch("/api/idCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 404) {
          alert(idRef.current.value + "는 사용가능한 아이디 입니다.");
          isClick = true;
        }
        if (data.code === 200) {
          alert(idRef.current.value + "는 사용하실 수 없는 아이디입니다.");
          idRef.current.value = "";
          idRef.current.focus();
        }
      });
  };

  const handleMember = () => {
    let type = $("input[name=type]:checked").val();
    if (nameRef.current.value === "" || nameRef.current.value === undefined) {
      alert("이름을 입력하세요");
      nameRef.current.focus();
      return false;
    }
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      alert("아이디를 입력하세요");
      idRef.current.focus();
      return false;
    }
    if (!isClick) {
      alert("아이디 중복검사를 해주세요");
      return false;
    }
    if (pw1Ref.current.value === "" || pw1Ref.current.value === undefined) {
      alert("비밀번호를 입력하세요");
      pw1Ref.current.focus();
      return false;
    }
    if (pw2Ref.current.value === "" || pw2Ref.current.value === undefined) {
      alert("비밀번호를 재입력하세요");
      pw2Ref.current.focus();
      return false;
    }
    if (pw1Ref.current.value !== pw2Ref.current.value) {
      alert("비밀번호가 일치하지 않습니다");
      pw2Ref.current.value = "";
      pw2Ref.current.focus();
      return false;
    }
    if (
      email1Ref.current.value === "" ||
      email1Ref.current.value === undefined
    ) {
      // alert("이메일을 입력하세요");
      console.log(email1Ref.current.value);
      email1Ref.current.focus();
      return false;
    }
    if (
      email2Ref.current.value === "" ||
      email2Ref.current.value === undefined
    ) {
      console.log(email2Ref.current.value);
      // alert("이메일을 입력하세요");
      email2Ref.current.focus();
      return false;
    }

    if (type === "student" && rnameRef.current.value === "") {
      alert("원룸이름을 입력해주세요 *쉼표로 구분*");
      return false;
    }
    // if (rnameRef.current.value !== "") {
    //   alert("원룸인증 페이지로 이동합니다.");
    //   console.log(rnameRef.current.value);
    // }
    if (type === "owner") {
    }
    console.log(rnameRef.current.value, typeof rnameRef.current.value);
    fetch("/api/member_update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        id: idRef.current.value,
        pw: pw1Ref.current.value,
        email: email1Ref.current.value + "@" + email2Ref.current.value,
        type: type,
        rnames: rnameRef.current.value,
      }),
    })
      .then((res) => {
        console.log("handleMember =>", res);
        if (res.status === 200) {
          alert("원룸인증 페이지로 이동합니다");
          navigate("/stu_certification");
        } else {
          alert("회원가입 실패!!!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="back">
      <div className="modifybox">
        <form action="post">
          <input
            type="text"
            name="name"
            size="20"
            defaultValue=""
            ref={nameRef}
            placeholder="이름을 입력하세요"
            className="in2"
          />
          <input
            type="text"
            name="id"
            size="20"
            defaultValue=""
            ref={idRef}
            placeholder="아이디를 입력하세요"
            className="in3"
          />
          <input
            type="button"
            name="check"
            value={"중복검사"}
            className="checkbtn"
            onClick={handleCheck}
          />
          <input
            type="password"
            name="pw"
            size="20"
            defaultValue=""
            ref={pw1Ref}
            placeholder="비밀번호를 입력하세요"
            className="in2"
          />
          <input
            type="password"
            name="pw2"
            size="20"
            defaultValue=""
            ref={pw2Ref}
            placeholder="비밀번호를 확인"
            className="in2"
          />
          <input
            type="text"
            name="email1"
            size="20"
            defaultValue=""
            ref={email1Ref}
            placeholder="이메일을 입력하세요"
            className="email"
          />
          <p style={{ textAling: "center", display: "inline-block" }}>@</p>
          <select name="email2" ref={email2Ref} className="email">
            <option value="none">====== 주소 ======</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.com">daum.com</option>
            <option value="gmail.com">gmail.com</option>
          </select>
          <input
            type="room_name"
            name="rn"
            size="20"
            defaultValue=""
            ref={rnameRef}
            placeholder="현재 살고 있는 원룸을 입력해주세요"
            className="in2"
          />
          <label>
            <input
              type="radio"
              name="type"
              value="student"
              className="radio"
              checked
            />
            학생
          </label>
          <label>
            <input type="radio" name="type" value="owner" className="radio" />
            집주인
          </label>
          <input
            type="button"
            className="logbtn2"
            value="회원가입"
            onClick={handleMember}
          />
          <input
            type="button"
            className="logbtn2"
            value="로그인하러 가기"
            onClick={() => navigate("/login")}
          />
          <br />
        </form>
      </div>
    </div>
  );
};

export default Modify;
