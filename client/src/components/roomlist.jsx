import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import SideInfo from "./sideinfo.jsx";
import $ from "jquery";

class RoomList extends React.Component {
  state = {
    isClick: true,
  };
  render() {
    let title = this.props.title;
    let index = this.props.index;
    let rnum = this.props.rnum;
    let addr = this.props.addr;
    let type = this.props.type;
    let select = this.props.select;
    const show = () => {
      this.setState({ isClick: false });
      $(".list-wrap").css("display", "none");
    };

    if (type === "adminroom") {
      type = "room";
    }
    return (
      <div onClick={show}>
        {this.state.isClick ? (
          <div className="list-wrap">
            <Card
              sx={{
                width: "550px",
                height: "350px",
                marginBottom: "20px",
                border: "none",
                margin: "5px auto",
              }}
            >
              <CardActionArea
                sx={{ width: "550px", height: "350px", opacity: "1" }}
              >
                <CardMedia
                  component="img"
                  height="250px"
                  width="550px"
                  image={process.env.PUBLIC_URL + `/${type}/${rnum}/1.jpg`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {addr}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ) : (
          <SideInfo
            select={select[index]}
            type={type}
            name={type}
            isclick={true}
          />
        )}
      </div>
    );
  }
}

export default RoomList;
