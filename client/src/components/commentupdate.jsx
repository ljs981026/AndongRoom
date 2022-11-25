import React from "react";
import "../css/comment.css";
import CommentList from "./commentlist";
import Comment from "./comment";
import $ from "jquery";
import "../css/comment.css";
import { useEffect } from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";
import RatingAverage from "./average";

const ARRAY = [0, 1, 2, 3, 4];

const CommentUpdate = (props) => {
  // 원룸 번호에 맞는 댓글
  const [list, setlist] = useState([]);
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [rating, setRating] = useState(0);
  const { num } = props;
  let textRef = React.createRef();
  let RatingBox = [];
  useEffect(() => {
    fetch("/api/commentlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: num,
      }),
    })
      .then((res) => res.json())
      .then((data) => setlist(data));
  }, [num]);

  useEffect(() => {
    sendReview();
  }, [clicked]); //컨디마 컨디업

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    console.log(score);
    setRating(score);
  };

  // 댓글 등록
  const handleComment = () => {
    if (localStorage.length === 0) {
      alert("로그인 후 이용해주세요");
      textRef.current.value = "";
      return false;
    }
    if (textRef.current.value === "" || textRef.current.value === undefined) {
      alert("댓글을 입력해주세요");
      textRef.current.focus();
      return false;
    }

    if (rating === 0) {
      alert("평점을 입력해주세요");
      return false;
    }

    let user = JSON.parse(localStorage.getItem("user")).id;
    fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: textRef.current.value,
        num: num,
        id: user,
        score: rating,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setlist(data);
        console.log(data);
      });
    textRef.current.value = "";
  };
  // 댓글 삭제
  const handleDelete = (e) => {
    fetch("/api/comment/delete", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: e.id,
        num: e.c_num,
        content: e.content,
        r_num: e.r_num,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setlist(data);
      });
  };

  return (
    <div className="comment_box">
      <RatingAverage num={num} clist={list} />
      <Wrap>
        <RatingText>평가하기</RatingText>
        <Stars>
          {ARRAY.map((el, idx) => {
            return (
              <FaStar
                key={idx}
                size="20"
                onClick={() => handleStarClick(el)}
                className={clicked[el] && "yellowStar"}
              />
            );
          })}
        </Stars>
      </Wrap>
      <input
        type="textarea"
        style={{ width: "70%", height: "40px", marginRight: "10px" }}
        ref={textRef}
        placeholder="댓글"
      />
      <input
        type="button"
        value="등록"
        onClick={handleComment}
        style={{ width: "20%", height: "38px" }}
      />
      <Comment clist={list} handleDelete={handleDelete} rating={rating} />
    </div>
  );
};

export default CommentUpdate;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 12px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
