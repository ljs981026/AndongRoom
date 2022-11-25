import "../css/comment.css";
import $ from "jquery";
import { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';



const Comment = ({handleDelete, clist}) => {
  let user = '';
  // console.log(RatingBox)
  if(localStorage.length > 0) {
    user = JSON.parse(localStorage.getItem("user")).id;
  }

  const star = (value) => {
    let RatingBox = []
    for(let i = 0; i < value; i++) {
      RatingBox.push(<FaStar />)
    }
    return RatingBox
  }

  return (
    clist &&
    clist.map((e, index) => {
      return(
        <div>
          <div className="chatbox" key={index} num={e.c_num} r_num={e.r_num}>
          <div className="topbox">
            <span>{e.id}</span>
            <Stars>
                {star(e.rating)}
            </Stars>
              {e.id === user && (
                <div className="btns">
                <div className="btn" onClick={() => handleDelete(e)}>
                  삭제
                </div>
                </div>
              )
            }
            
          </div>
          <div className="bottombox">
            <span>{e.content}</span>
          </div>
        </div>      
      </div>
      )
    }) 
  );
};

export default Comment;

const Stars = styled.div`
  margin-left: 5px;
  display: inline-block;
  padding-top: 5px;

  & svg {
    color: #fcc419;
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