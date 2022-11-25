import React from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { Link } from "react-router-dom";
import "../css/map.css";
import Header from "./header.jsx";
import SideInfo from "./sideinfo.jsx";
import SideRoomList from "./sideroomlist";

class MapAround extends React.Component {
  state = {
    place: "",
    setIsOpen: false,
    lat: null,
    lng: null,
    index: null,
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ place: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const type = window.location.pathname.slice(8);
    if (type === this.props.type) {
      const res = await fetch("/api/" + type);
      const body = await res.json();
      console.log(body);
      return body;
    }
  };
  render() {
    const t = this.props.type;
    console.log(t);
    console.log(window.location.pathname);
    console.log(this.state.place);
    let type = window.location.pathname.slice(8);
    console.log(type);
    console.log(type);
    let positions = [];
    for (let i = 0; i < this.state.place.length; i++) {
      positions.push({
        title: this.state.place[i].r_name,
        latlng: { lat: this.state.place[i].lat, lng: this.state.place[i].lon },
        addr: this.state.place[i].r_addr,
        price: this.state.place[i].r_price,
        sort: this.state.place[i].r_sort,
        num: this.state.place[i].r_num,
      });
    }
    console.log(type);

    return (
      <div>
        <Header />
        {this.state.setIsOpen ? (
          <SideInfo
            select={this.state.place[this.state.index]}
            open={this.state.setIsOpen}
            all={this.state.place}
            name={type}
            setIsOpen={this.state.setIsOpen}
          />
        ) : (
          <SideRoomList select={positions} name={type} all={this.state.place} />
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
              price={position.price}
              sort={position.sort}
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
                              `/${type}/${this.state.index + 1}/1.jpg`
                            }
                            width="73"
                            height="70"
                            alt={position.title}
                          />
                        </div>
                        <div className="desc">
                          <div className="ellipsis">{position.addr}</div>
                          <div className="jibun ellipsis">{position.sort}</div>
                          <div>
                            <Link
                              to={`/around/${type}:r_num${this.state.index}`}
                            >
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

export default MapAround;
