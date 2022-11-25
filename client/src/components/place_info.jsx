import React from "react";
import ImageSlide from "./imageslide";
import Header from "./header";
import "../css/roominfo.css";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

class PlaceInfo extends React.Component {
  state = {
    place: "",
    setIsOpen: false,
    lat: null,
    lng: null,
    index: null,
    type: null,
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ place: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const loc = window.location.pathname;
    const type = loc.split("/")[2].split(":");
    const res = await fetch("/api/" + type[0]);
    this.setState({ type: type[0] });
    const body = await res.json();
    let index = type[1].slice(5);
    let select_body = body[index];
    return select_body;
  };

  render() {
    return (
      <div className="info_wrap">
        <Header />
        <CssBaseline />
        <div className="content_wrap">
          <Container fixed>
            <Box sx={{ width: "1400px", height: "100vh" }}>
              <ImageSlide type={this.props.type} num={this.state.place.r_num} />
              <Table sx={{ width: "400px", height: "600px" }}>
                <TableBody>
                  <TableRow>
                    <TableCell width={"200px"}>
                      <span className="discription">장소</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">
                        {this.state.place.r_name}
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="discription">주소</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">
                        {this.state.place.r_addr}
                      </span>
                    </TableCell>
                  </TableRow>
                  {this.state.type !== "play" && (
                    <TableRow>
                      <TableCell>
                        <span className="discription">전화번호</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">
                          {this.state.place.r_phone}
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell>
                      <span className="discription">구분</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">
                        {this.state.place.r_sort}
                      </span>
                    </TableCell>
                  </TableRow>
                  {this.state.type === "food" && (
                    <TableRow>
                      <TableCell>
                        <span className="discription">대표메뉴</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">
                          {this.state.place.r_menu}
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                  {this.state.type === "play" && (
                    <TableRow>
                      <TableCell>
                        <span className="discription">이용요금</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">
                          {this.state.place.r_fee}
                        </span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Container>
        </div>
      </div>
    );
  }
}

export default PlaceInfo;
