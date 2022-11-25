import React from "react";
import RoomList from "./roomlist";

class SideRoomList extends React.Component {
  render() {
    let select = this.props.select;
    let type = this.props.name;
    console.log(select);
    // console.log(select, type);
    console.log(typeof select);
    const nameList = select.map((individual, index) => (
      <RoomList
        title={individual.title}
        key={index}
        rnum={individual.rnum}
        index={index}
        addr={individual.addr}
        type={type}
        select={select}
      />
    ));
    console.log(nameList);
    return (
      <div>
        <div className="side">{nameList}</div>
      </div>
    );
  }
}

export default SideRoomList;
