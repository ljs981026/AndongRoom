import "../css/filter.css";
import "../css/toggleswitch.css";
import $ from "jquery";
import { useRef, useState } from "react";

const Filter = ({ handleClick }) => {
  const [IsClick, setIsClick] = useState(false);
  const winRef = useRef(null);
  const kitRef = useRef(null);
  const verRef = useRef(null);
  const [Option, setOption] = useState([]);

  if (IsClick) {
  }
  const handleFilter = () => {
    if (!IsClick) {
      $(".filter_wrap")
        .css("width", "300px")
        .css("height", "300px")
        .css("transition", ".5s");
      $(".option_wrap").css("transition", "all 1s");
      setIsClick(true);
    }
  };
  const filterClose = () => {
    if (IsClick) {
      $(".filter_wrap")
        .css("width", "50px")
        .css("height", "50px")
        .css("transition", "all .5s");

      setIsClick(false);
    }
  };
  const SubmitOption = () => {
    let selected = [];
    if (winRef.current.checked) {
      selected.push({ r_window: 1 });
    }
    if (kitRef.current.checked) {
      selected.push({ r_kitchen: 1 });
    }
    if (verRef.current.checked) {
      selected.push({ r_veranda: 1 });
    }
    return selected;
  };

  return (
    <div className="filter_wrap" onClick={handleFilter}>
      {!IsClick ? (
        <div className="searchImg">
          <img src={process.env.PUBLIC_URL + `/search.png`} alt="none" />
        </div>
      ) : (
        <div className="option_wrap">
          <div className="close" onClick={filterClose}>
            <img src={process.env.PUBLIC_URL + `/close.png`} alt="none" />
          </div>
          <div className="optionbox">
            <div className="option_menu">
              <label>
                <span>창문</span>
                <input
                  className="optioncb"
                  type="checkbox"
                  name="r_window"
                  ref={winRef}
                />
              </label>
            </div>
            <div className="option_menu">
              <label>
                <span>주방분리</span>
                <input
                  className="optioncb"
                  type="checkbox"
                  name="r_kitchen"
                  ref={kitRef}
                />
              </label>
            </div>
            <div className="option_menu">
              <label>
                <span>베란다</span>
                <input
                  className="optioncb"
                  type="checkbox"
                  name="r_veranda"
                  ref={verRef}
                />
              </label>
            </div>
          </div>
          <div className="submitOption">
            <input
              type="button"
              className="submitbtn"
              onClick={() => handleClick(SubmitOption)}
              value={"검색"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
