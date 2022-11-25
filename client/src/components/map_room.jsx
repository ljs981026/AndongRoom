import { useState } from "react";
import "../css/map.css";
import Header from "./header";
import "../css/search.css";
import Room from "./room";
import Filter from "./filter";

const MapBox = () => {
  const [Option, setOption] = useState([]);

  const handleClick = (SubmitOption) => {
    console.log(SubmitOption(Option));
    setOption(SubmitOption(Option));
  };
  return (
    <div>
      <Header />
      <Filter handleClick={handleClick} />
      <Room option={Option} />
    </div>
  );
};

export default MapBox;
