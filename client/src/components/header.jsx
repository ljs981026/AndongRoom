import "../css/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

const Header = (props) => {
  const roomRef = useRef();
  const navigate = new useNavigate();
  const { admin } = props;
  const redirect = (e) => {
    console.log(e.target.id);
    navigate(e.target.id);
    window.location.reload();
  };
  return (
    <section className="header">
      <div className="head_wrapper">
        <div className="head_title">
          <i className="fas fa-kiss-wink-heart"></i> 안방
        </div>
        {!window.location.pathname.includes("adminpage") ? (
          <ul className="head_lists">
            <li onClick={redirect} id="/room" ref={roomRef}>
              원룸
            </li>
            <li onClick={redirect} id="/around/food" ref={roomRef}>
              식당
            </li>
            <li onClick={redirect} id="/around/alchole" ref={roomRef}>
              술집
            </li>
            <li onClick={redirect} id="/around/play" ref={roomRef}>
              놀거리
            </li>
            <li onClick={redirect} id="/around/convinience" ref={roomRef}>
              편의시설
            </li>
          </ul>
        ) : (
          <ul className="head_lists">
            <li id="/adminpage" onClick={redirect} ref={roomRef}>
              데이터 목록
            </li>
            <li onClick={redirect} id="/adminpage2" ref={roomRef}>
              인증요청
            </li>
            <li onClick={redirect} id="/around/alchole" ref={roomRef}>
              신고목록
            </li>
          </ul>
        )}
        <div className="head_log">
          {localStorage.length > 0 ? (
            <li style={{ color: "#fff" }}>
              <Link
                style={{ color: "#fff" }}
                to="/"
                onClick={() => {
                  localStorage.clear();
                  // window.location.reload();
                }}
              >
                로그아웃
              </Link>
            </li>
          ) : (
            <li style={{ color: "#fff" }}>
              <Link style={{ color: "#fff" }} to="/login">
                로그인
              </Link>
            </li>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
