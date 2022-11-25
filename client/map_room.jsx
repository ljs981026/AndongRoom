import React from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { Link } from "react-router-dom";
import "../css/map.css";
import Header from "./header";
import SideInfo from "./sideinfo";
import SideRoomList from "./sideroomlist";
import "../css/search.css";
import fd from "./filterdata.js";

class MapBox extends React.Component {
  state = {
    rooms: "",
    setIsOpen: false,
    lat: null,
    lng: null,
    index: null,
    type: "food",
    count: 0,
    window: 0,
    kitchen: 0,
    direction: "N",
    op: [],
    num: null,
  };

  componentDidMount() {
    this.changeState();
  }

  callApi = async () => {
    try {
      const res = await fetch(`/api/room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fd,
        }),
      });
      const body = await res.json();
      console.log(body[0]);
      let filter = [];
      for (let i = 0; i < body.length; i++) {
        filter.push(body[i]);
        // console.log(filter)
      }
      console.log(filter);
      this.setState({ rooms: filter });
      return body;
    } catch (err) {
      console.log("-----------------");
      console.log(err);
    }
  };

  changeState = () => {
    this.callApi();
  };

  filter = (e) => {
    if (e.target.checked) {
      // fd.push(e.target.value)
      console.log(e.target.name, e.target.id);
      // fd[] = {
      //   [e.target.id] : e.target.value,
      // }
      fd.push({
        [e.target.id]: e.target.value,
      });
    } else {
      // fd.splice(fd.indexOf(Object.keys(fd.indexOf(fd.includes(e.target.id)))), 1)
      for (let i = 0; i < fd.length; i++) {
        console.log(Object.keys(fd[i]));
        if (String(Object.keys(fd[i])) === e.target.id) {
          console.log(i, "발견");
          fd.splice(i, 1);
        }
      }
      console.log(e.target.id);
      console.log(fd.indexOf(e.target.id));
      console.log(e.target.value);
    }
    console.log(fd);
    this.callApi();
  };
  render() {
    let positions = [];
    for (let i = 0; i < this.state.rooms.length; i++) {
      positions.push({
        title: this.state.rooms[i].r_name,
        latlng: { lat: this.state.rooms[i].lat, lng: this.state.rooms[i].lon },
        addr: this.state.rooms[i].r_addr,
        price: this.state.rooms[i].r_price,
        window: this.state.rooms[i].r_window,
        num: this.state.rooms[i].r_num,
        deposit: this.state.rooms[i].r_deposit,
        payment: this.state.rooms[i].r_payment,
      });
    }
    console.log(this.state.index);
    return (
      <div>
        <Header />
        {/* <div style={{width: "100%", height: "100px"}} onClick={this.changeState}></div> */}
        <div className="search">
          <div className="menu-box">
            <input
              type="checkbox"
              name="0"
              id="r_window"
              value={1}
              onChange={this.filter}
            />
            <label>창문</label>
            <input
              type="checkbox"
              name="1"
              id="r_kitchen"
              value={1}
              onChange={this.filter}
            />
            <label>주방</label>
            <input
              type="checkbox"
              name="2"
              id="r_veranda"
              value={1}
              onChange={this.filter}
            />
            <label>베란다</label>
          </div>
        </div>
        {this.state.setIsOpen ? (
          <SideInfo
            select={this.state.rooms[this.state.index]}
            // open={this.state.setIsOpen}
            all={this.state.rooms}
            name="room"
            // changeState={this.changeState}
          />
        ) : (
          <SideRoomList select={positions} name="room" all={this.state.rooms} />
        )}
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 36.532155,
            lng: 128.79227,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "3200px",
            position: "fixed",
          }}
          level={3} // 지도의 확대 레벨
        >
          {positions.map((position, index) => (
            <MapMarker
              key={index}
              position={position.latlng} // 마커를 표시할 위치
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                size: {
                  width: 35,
                  height: 46,
                }, // 마커이미지의 크기입니다
              }}
              clickable={true}
              title={position.title}
              addr={position.addr}
              deposit={position.deposit}
              payment={position.payment}
              onClick={() => {
                this.setState({ setIsOpen: true });
                this.setState({ lat: position.latlng.lat });
                this.setState({ lng: position.latlng.lng });
                this.setState({ index: index });
                this.setState({ num: positions.num });
              }}
            >
              {this.state.setIsOpen && this.state.index === index && (
                <CustomOverlayMap position={position.latlng} zIndex={10}>
                  <div className="wrap">
                    <div className="info">
                      <div className="title">
                        {position.title}
                        <div
                          className="close"
                          onClick={() => this.setState({ setIsOpen: false })}
                          title="닫기"
                        ></div>
                      </div>
                      <div className="body">
                        <div className="img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              `/room/${this.state.index + 1}/1.jpg`
                            }
                            width="73"
                            height="70"
                            alt={position.title}
                          />
                        </div>
                        <div className="desc">
                          <div className="ellipsis">{position.addr}</div>
                          <div className="jibun ellipsis">
                            보증금/계약금: {position.deposit}
                            {position.payment}
                          </div>
                          <div>
                            <Link to={`/room/sol:r_num${this.state.index}`}>
                              <p>상세보기</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                </CustomOverlayMap>
              )}
            </MapMarker>
          ))}
        </Map>
      </div>
    );
  }
}

export default MapBox;
