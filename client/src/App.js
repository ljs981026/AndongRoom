import MapBox from "./components/map_room.jsx";
// import MapBox2 from "./components/no_use/map_non.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React from "react";
// import Room1info from "./components/room1_info";
// import Room2info from "./components/room2_info";
// import MapSort from "./components/map_sort";
import MapAround from "./components/map_around";
import Login from "./components/login.jsx";
import Modify from "./components/modify.jsx";
import AdminPage from "./components/adminpage.jsx";
import AdminPage2 from "./components/adminpage2.jsx";

import StudentCertifiCation from "./components/student_certification.jsx";
import Room from "./components/room.jsx";
// import Login from "./components/login.jsx";

function App() {
  // const [id, setid] = useState("");
  // if (localStorage.length > 0) {
  //   if (JSON.parse(localStorage.getItem("user")).id === "admin98") {
  //     setid("admin");
  //   } else {
  //     setid("noadmin");
  //   }
  // }
  // console.log(JSON.parse(localStorage.getItem("user")).id);
  // console.log(id);
  return (
    <BrowserRouter>
      <Routes>
        {/* {id === "admin" ? (
          <Route path="/" element={<AdminPage />}></Route>
        ) : (
          
        )} */}
        <Route path="/" element={<MapBox />}></Route>
        <Route path="/room" element={<MapBox />}></Route>
        <Route
          path={`/around/food`}
          element={<MapAround type="food" />}
        ></Route>
        <Route
          path={`/around/alchole`}
          element={<MapAround type="alchole" />}
        ></Route>
        <Route
          path={`/around/play`}
          element={<MapAround type="play" />}
        ></Route>
        <Route
          path={`/around/convinience`}
          element={<MapAround type="convinience" />}
        ></Route>
        {/* <Route path="/login" element={<Login />}></Route> */}
        <Route path={`/login`} element={<Login />}></Route>
        <Route path={`/login/modify`} element={<Modify />}></Route>
        <Route path={`/adminpage`} element={<AdminPage />}></Route>
        <Route path={`/adminpage2`} element={<AdminPage2 />}></Route>
        <Route path={"/roomr"} element={<Room />}></Route>
        <Route
          path={`/stu_certification`}
          element={<StudentCertifiCation />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
