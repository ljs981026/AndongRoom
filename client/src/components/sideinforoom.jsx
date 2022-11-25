import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import "../css/sideinfo.css";
import "../css/roominfo.css";
import CommentUpdate from "./commentupdate";
import "../css/comment.css";

class SideInfoRoom extends React.Component {
  state = {
    list: "",
    clist: "",
  };

  render() {
    let name = this.props.name;
    let info = this.props.info;
    let option_content = "";
    const option_view = (op) => {
      if (op === 1) {
        option_content += "냉장고, 에어컨, 세탁기, 수납장, 책상";
      }
      if (op === 2) {
        option_content +=
          "냉장고, 와이파이, 에어컨, 세탁기, 수납장, 침대, 책상, 전자레인지";
      }
      return option_content;
    };
    return (
      <div className="info_wrap">
        <CssBaseline />
        <div className="content_wrap">
          <Container fixed>
            {name === "room" ? (
              <Box sx={{ width: "550px" }}>
                <div className="maininfo">
                  <span className="room_title">{info.title}</span>
                  <span className="room_price">
                    계약금(1년기준) {info.payment}/{info.deposit}
                  </span>
                  {info.addr.includes("경상북도 안동시") ? (
                    <span className="room_addr">{info.addr}</span>
                  ) : (
                    <span className="room_addr">
                      경상북도 안동시 {info.addr}
                    </span>
                  )}
                </div>
                <Table sx={{ width: "550px" }}>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <span className="discription">전화번호</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">{info.phone}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <span className="discription">관리비</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">{info.fee}원</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <span className="discription">창문</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">
                          {info.window ? "있음" : "없음"}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <span className="discription">주방분리</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">
                          {info.kitchen ? "예" : "아니요"}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <span className="discription">베란다</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">
                          {info.veranda > 0 ? "있음" : "없음"}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <span className="discription">남향,북향</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">
                          {info.direction === "N" ? "북향" : "남향"}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <span className="discription">평수</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">{info.size}평</span>
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
                            <Typography>{option_view(info.option)}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <CommentUpdate num={this.props.num} />
              </Box>
            ) : (
              <Box sx={{ width: "400px" }}>
                <Table sx={{ width: "400px" }}>
                  <TableBody>
                    <TableRow>
                      <TableCell width={"200px"}>
                        <span className="discription">장소</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">{info.r_name}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <span className="discription">주소</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">{info.r_addr}</span>
                      </TableCell>
                    </TableRow>
                    {name !== "play" && (
                      <TableRow>
                        <TableCell>
                          <span className="discription">전화번호</span>
                        </TableCell>
                        <TableCell>
                          <span className="discription">{info.r_phone}</span>
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell>
                        <span className="discription">구분</span>
                      </TableCell>
                      <TableCell>
                        <span className="discription">{info.r_sort}</span>
                      </TableCell>
                    </TableRow>
                    {name === "food" && (
                      <TableRow>
                        <TableCell>
                          <span className="discription">대표메뉴</span>
                        </TableCell>
                        <TableCell>
                          <span className="discription">{info.r_menu}</span>
                        </TableCell>
                      </TableRow>
                    )}
                    {name === "play" && (
                      <TableRow>
                        <TableCell>
                          <span className="discription">이용요금</span>
                        </TableCell>
                        <TableCell>
                          <span className="discription">{info.r_fee}</span>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Container>
        </div>
      </div>
    );
  }
}

export default SideInfoRoom;
