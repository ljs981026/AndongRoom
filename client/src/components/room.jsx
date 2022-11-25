import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { Link } from "react-router-dom";
import "../css/map.css";
import SideInfo from "./sideinfo";
import SideRoomList from "./sideroomlist";

const Room = (props) => {
  const [RoomData, setRoomData] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const [Location, setLocation] = useState(0);
  const { option } = props;
  useEffect(() => {
    fetch("/api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fd: option,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let position = [];
        for (let i = 0; i < data.length; i++) {
          position.push({
            title: data[i].r_name,
            latlng: {
              lat: data[i].lat,
              lng: data[i].lon,
            },
            addr: data[i].r_addr,
            window: data[i].r_window,
            rnum: data[i].r_num,
            deposit: data[i].r_deposit,
            payment: data[i].r_payment,
            phone: data[i].r_phone,
            kitchen: data[i].r_kitchen,
            option: data[i].r_option,
            size: data[i].r_size,
            direction: data[i].r_direction,
            fee: data[i].r_fee,
            veranda: data[i].r_veranda,
          });
        }
        setLocation(0);
        setRoomData(position);
      });
  }, [option]);

  return (
    <div>
      {IsOpen ? (
        <SideInfo select={RoomData[Location]} all={RoomData} name="room" />
      ) : (
        <SideRoomList select={RoomData} name="room" />
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
        {RoomData.map((positions, index) => (
          <MapMarker
            key={index}
            position={positions.latlng} // 마커를 표시할 위치
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
              size: {
                width: 35,
                height: 46,
              }, // 마커이미지의 크기입니다
            }}
            clickable={true}
            title={positions.title}
            addr={positions.addr}
            deposit={positions.deposit}
            payment={positions.payment}
            onClick={() => {
              setIsOpen(true);
              setLocation(index);
            }}
          >
            {IsOpen && Location === index && (
              <CustomOverlayMap position={positions.latlng} zIndex={10}>
                <div className="wrap">
                  <div className="info">
                    <div className="title">
                      {positions.title}
                      <div
                        className="close"
                        onClick={() => setIsOpen(false)}
                        title="닫기"
                      ></div>
                    </div>
                    <div className="body">
                      <div className="img">
                        <img
                          src={
                            process.env.PUBLIC_URL + `/room/${Location}/1.jpg`
                          }
                          width="73"
                          height="70"
                          alt={positions.title}
                        />
                      </div>
                      <div className="desc">
                        <div className="ellipsis">{positions.addr}</div>
                        <div className="jibun ellipsis">
                          보증금/계약금: {positions.deposit}
                          {positions.payment}
                        </div>
                        <div>
                          <p>상세보기</p>
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
};

export default Room;
