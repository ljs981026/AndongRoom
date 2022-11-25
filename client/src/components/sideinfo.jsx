import React from "react";
import "../css/sideinfo.css";
import ImageSlide from "./imageslide";
import SideInfoRoom from "./sideinforoom";
import $ from "jquery";

class SideInfo extends React.Component {
  render() {
    let select = this.props.select;
    let type = this.props.type;
    let name = this.props.name;
    if (this.props.isclick) {
      $(".side").css("margin-top", "0px");
    }
    return (
      <div
        className="side"
        style={{ height: "auto", overflow: "hidden", minHeight: "1350px" }}
      >
        <ImageSlide type={type} name={name} num={select.rnum} />
        <SideInfoRoom info={select} name={name} />
      </div>
    );
  }
}

export default SideInfo;
