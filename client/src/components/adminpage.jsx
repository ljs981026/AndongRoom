import { useEffect, useState } from "react";
import Header from "./header";
import admin from "./admin.js";
import Box from "@mui/material/Box";
import RoolistColumn from "./data/roomlistfield.js";
import MemberlistColumn from "./data/memberfield";
import PlaceList from "./data/placefield";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import "../css/admin1.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const AdminPage = () => {
  const [list, setlist] = useState([]);
  const [mlist, setmlist] = useState([]);
  const [plist, setplist] = useState([]);
  const [posi, setposi] = useState([]);
  const [mem, setmem] = useState([]);
  const [pla, setpla] = useState([]);
  const navigate = useNavigate();
  const typeRef = useRef();
  // let typeval = typeRef.current.value;
  // console.log(typeRef);
  useEffect(() => {
    if (
      localStorage.length === 0 ||
      JSON.parse(localStorage.getItem("user")).id !== admin.id
    ) {
      alert("접근 권한이 없습니다.");
      navigate("/");
    }
    fetch("api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fd: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setlist(data);
        let positions = [];
        for (let i = 0; i < data.length; i++) {
          positions.push({
            id: i + 1,
            title: data[i].r_name,
            addr: data[i].r_addr,
            deposit: data[i].r_deposit,
            payment: data[i].r_payment,
            phone: data[i].r_phone,
          });
        }
        setposi(positions);
      });
    fetch("/api/memberlist")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setmlist(data);
        let members = [];
        for (let i = 0; i < data.length; i++) {
          members.push({
            num: i + 1,
            id: data[i].id,
            password: data[i].password,
            name: data[i].name,
            email: data[i].email,
            type: data[i].type,
          });
        }
        setmem(members);
      });
  }, []);
  // const getRoomList = await fetch()
  // console.log(list);
  return (
    <div className="admin_wrap">
      <Header />
      <div className="admin_roomlist">
        <div className="data_title">
          <span>원룸 리스트</span>
        </div>
        <div className="admin_roomdata">
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={posi}
              columns={RoolistColumn}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </div>
      </div>
      <div className="admin_memberlist">
        <div className="data_title">
          <span>회원 리스트</span>
        </div>
        <div className="admin_roomdata">
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={mem}
              columns={MemberlistColumn}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
