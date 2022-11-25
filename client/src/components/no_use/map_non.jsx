import React from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { Link } from "react-router-dom";
import "../css/map.css";
import Header from "../header.jsx";

class MapBox extends React.Component {
  state = {
    rooms2: "",
    setIsOpen: false,
    lat: null,
    lng: null,
    index: null,
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ rooms2: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const res = await fetch("/api/non_room");
    const body = await res.json();
    return body;
  };
  render() {
    console.log(this.state.rooms2);
    let positions = [];
    for (let i = 0; i < this.state.rooms2.length; i++) {
      positions.push({
        title: this.state.rooms2[i].r_name,
        latlng: {
          lat: this.state.rooms2[i].lon,
          lng: this.state.rooms2[i].lat,
        },
        addr: this.state.rooms2[i].r_addr,
        price: this.state.rooms2[i].r_price,
      });
    }
    console.log(this.state.index);
    return (
      <div>
        <Header />
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 36.535155,
            lng: 128.79827,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "3200px",
            position: "fixed",
          }}
          level={2} // 지도의 확대 레벨
          // draggable= { false }
        >
          {positions.map((position, index) => (
            <MapMarker
              key={index}
              position={position.latlng} // 마커를 표시할 위치
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                size: {
                  width: 24,
                  height: 35,
                }, // 마커이미지의 크기입니다
              }}
              clickable={true}
              title={position.title}
              addr={position.addr}
              price={position.price}
              onClick={() => {
                this.setState({ setIsOpen: true });
                this.setState({ lat: position.latlng.lat });
                this.setState({ lng: position.latlng.lng });
                this.setState({ index: index });
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
                              `/room/${this.state.index}/1.jpg`
                            }
                            width="73"
                            height="70"
                            alt={position.title}
                          />
                        </div>
                        <div className="desc">
                          <div className="ellipsis">
                            경상북도 안동시 {position.addr}
                          </div>
                          <div className="jibun ellipsis">
                            보증금/계약금: {position.price}
                          </div>
                          <div>
                            <Link to={`/room/non:r_num${this.state.index}`}>
                              <p>상세보기{console.log(this.state.index)}</p>
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
