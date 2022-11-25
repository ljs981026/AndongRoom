import React from "react";
import ImageSlide from "../imageslide";
import Header from "../header";
import "../css/roominfo.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

class Room2info extends React.Component {
  state = {
    rooms: "",
    setIsOpen: false,
    lat: null,
    lng: null,
    index: null,
  };
  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ rooms: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const res = await fetch("/api/non_room");
    const body = await res.json();
    let index = window.location.pathname.slice(15);
    let select_body = body[index];
    return select_body;
  };
  render() {
    let name = this.state.rooms.r_name;
    let addr = this.state.rooms.r_addr;
    let phone = this.state.rooms.r_phone;
    let fee = this.state.rooms.r_fee;
    let window = this.state.rooms.r_window;
    let kitchen = this.state.rooms.r_kitchen;
    let direction = this.state.rooms.r_direction;
    let option = this.state.rooms.r_option;
    let price = this.state.rooms.r_price;
    let veranda = this.state.rooms.r_veranda;
    let size = this.state.rooms.r_size;

    let option_content = "";

    console.log(this.state.rooms);
    const option_view = (op) => {
      if (option === 1) {
        option_content += "냉장고, 에어컨, 세탁기, 수납장, 책상";
      }
      if (option === 2) {
        option_content +=
          "냉장고, 와이파이, 에어컨, 세탁기, 수납장, 침대, 책상, 전자레인지";
      }
      return option_content;
    };
    return (
      <div className="info_wrap">
        <Header />
        <CssBaseline />
        <div className="content_wrap">
          <Container fixed>
            <Box sx={{ width: "1400px", height: "100vh" }}>
              <ImageSlide />
              <Table sx={{ width: "400px" }}>
                <TableBody>
                  <TableRow>
                    <TableCell width={"200px"}>
                      <span className="discription">원룸이름</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">{name}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="discription">주소</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">{addr}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="discription">전화번호</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">{phone}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="discription">보증금/월세</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">{price}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="discription">관리비</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">{fee}원</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="discription">창문</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">
                        {window ? "있음" : "없음"}
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="discription">주방분리</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">
                        {kitchen ? "예" : "아니요"}
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="discription">베란다</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">
                        {veranda > 0 ? "있음" : "없음"}
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="discription">남향,북향</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">
                        {direction === "N" ? "북향" : "남향"}
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="discription">평수</span>
                    </TableCell>
                    <TableCell>
                      <span className="discription">{size}평</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <span className="discription">옵션</span>
                    </TableCell>
                    <TableCell>
                      <Accordion sx={{ width: "200px" }}>
                        <AccordionSummary
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>옵션...</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{option_view(option)}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Container>
        </div>
      </div>
    );
  }
}

export default Room2info;
