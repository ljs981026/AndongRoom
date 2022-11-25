import axios from "axios";
import { useEffect, useRef, useState } from "react";

const StudentCertifiCation = () => {
  const [user, setuser] = useState([]);
  const [roomlist, setroomlist] = useState([]);
  const [img, setimg] = useState("");
  const fileInput = useRef(null);
  const imgRef = useRef();
  useEffect(() => {
    fetch("/api/memberlist")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setuser(data[1].rnames);
        let rn = data[1].rnames.split(",");
        setroomlist(rn);
        // console.log(roomlist);
        // console.log(roomlist.length);
      });
  }, []);

  const handleButtonClick = (e) => {
    // console.log(fileInput.current);
    fileInput.current.click();
  };

  const handleChange = (e) => {
    const formData = new FormData();
    formData.append("img", e.target.files[0]);
    console.log(e.target.files[0].name);
    axios.post("/upload", formData).then((res) => {
      console.log(res);
    });
    encodeFileToBase64(e.target.files[0]);
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setimg(reader.result);
        resolve();
      };
    });
  };
  // console.log(img);
  return (
    <div>
      <div>
        <button onClick={handleButtonClick}>파일 업로드</button>
        <input
          type="file"
          ref={fileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <div className="preview">
          {img && <img src={img} alt="preview-img" />}
        </div>
      </div>
    </div>
  );
};

export default StudentCertifiCation;
