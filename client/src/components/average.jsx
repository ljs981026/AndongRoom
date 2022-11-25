import { useEffect, useState } from "react";
import { ImStarFull } from "react-icons/im";
import "../css/average.css";

const RatingAverage = (props) => {
  const { num } = props;
  const { clist } = props;
  console.log(clist);
  const [RateNum, setRateNum] = useState(0);
  const [RateText, setRateText] = useState("");
  const [Image, setImage] = useState("bad");
  const [CommentList, setCommentList] = useState(0);
  const [OneCount, setOneCount] = useState(0);
  const [TwoCount, setTwoCount] = useState(0);
  const [ThreeCount, setThreeCount] = useState(0);
  const [FourCount, setFourCount] = useState(0);
  const [FiveCount, setFiveCount] = useState(0);

  // console.log(clist);
  console.log(num);
  useEffect(() => {
    fetch("/api/comment/average", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num: num
      })
    }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      let total = 0;
      let average = 0;
      let count1 = 0;
      let count2 = 0;
      let count3 = 0;
      let count4 = 0;
      let count5 = 0;
      if(data.length > 0) {
        setCommentList(data.length);
        for(let i = 0; i < data.length; i++) {
          if(data[i].RATING === 1) {
            count1 += 1;
          }
          if(data[i].RATING === 2) {
            count2 += 1;
          }
          if(data[i].RATING === 3) {
            count3 += 1;
          }
          if(data[i].RATING === 4) {
            count4 += 1;
          }
          if(data[i].RATING === 5) {
            count5 += 1;
          }
          total += data[i].RATING;
          setOneCount(count1);
          setTwoCount(count2);
          setThreeCount(count3);
          setFourCount(count4);
          setFiveCount(count5);
        }
        average = (total/data.length).toFixed(1);
        if(average < 2) {
          setRateText("최악이에요");
        }
        if(average >= 2 && average < 4 ) {
          setRateText("그냥그래요");
          setImage("soso");
        }
        if(average >=4) {
          setRateText("좋아요!");
          setImage("good");
        }

        setRateNum(average);
      }
      if(data.length === 0) {
        setRateNum(0)
        setRateText("평가가 없습니다");
        setImage("soso");
        setOneCount(0);
        setTwoCount(0);
        setThreeCount(0);
        setFourCount(0);
        setFiveCount(0);
      }
    })
  },[ num, clist ])

  return(
    <div className="statbox">
      <div className="leftbox">
        <div className="emojibox">
          <div className="emoji" style={{"backgroundImage": `url('${process.env.PUBLIC_URL}/${Image}.png')`}}></div>
          <div className="text"><span>{RateText}</span></div>
        </div>
        <div className="ratebox">
          <ImStarFull />
          <span>{RateNum}</span>
        </div>
      </div>
      <div className="rightbox">
        <div className="progresswrap">
          <ImStarFull style={{"marginTop": "12px"}} />
          <div className="stattext">1</div>
          <progress value={OneCount} max={CommentList}></progress>
        </div>
        <div className="progresswrap">
          <ImStarFull style={{"marginTop": "12px"}}/>
          <div className="stattext">2</div>
          <progress value={TwoCount} max={CommentList}></progress>
        </div>
        <div className="progresswrap">
          <ImStarFull style={{"marginTop": "12px"}}/>
          <div className="stattext">3</div>
          <progress value={ThreeCount} max={CommentList}></progress>
        </div>
        <div className="progresswrap">
          <ImStarFull style={{"marginTop": "12px"}}/>
          <div className="stattext">4</div>
          <progress value={FourCount} max={CommentList}></progress>
        </div>
        <div className="progresswrap">
          <ImStarFull style={{"marginTop": "12px"}}/>
          <div className="stattext">5</div>
          <progress value={FiveCount} max={CommentList}></progress>
        </div>
      </div>
    </div>
  )
}

export default RatingAverage;