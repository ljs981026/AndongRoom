import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "../css/student_certification.css";

const StudentCertifiCation = () => {
  const [user, setuser] = useState([]);
  const [roomlist, setroomlist] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [length, setlength] = useState(0);
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
        setlength(rn.length);
        console.log(roomlist);
        console.log(roomlist.length);
      });
  }, []);

  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  const handleChange = (e) => {
    const formData = new FormData();
    formData.append("img", e.target.files[0]);
    console.log(e.target.files[0].name);
    axios.post("/upload", formData).then((res) => {
      console.log(res);
    });
    for (let i = 0; i < setlength; i++) {
      encodeFileToBase64(e.target.files[i]);
    }
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setimg(reader.result);
        console.log(img);
        resolve();
      };
    });
  };

  // 이미지 상대경로 저장
  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > length) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  };
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <div className="certification_back">
      <div className="certification_wrap">
        <div className="text_wrap">
          <span>원룸 인증</span>
        </div>
        <div className="imgplace_wrap">
          <div className="imgplace">
            {showImages.map((image, id) => (
              <div className="img">
                <img src={image} alt={`${image} - ${id}`} />
                <div className="closebtn" onClick={() => handleDeleteImage(id)}>
                  취소
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="notice_wrap">
          <div className="notice">
            <span className="notice_text">
              *jpg, png 등과같은 사진 파일만 올려주세요* <br />
              파일 이름은 자신의 아이디 + 원룸이름_1..2.. ex) lee123햇살빌_1
            </span>
          </div>
          <div className="howto">
            <span>자신이 살고 있는 원룸의 고지서를 첨부해주세요</span>
          </div>
        </div>
        <input
          type="button"
          value={"파일업로드"}
          onClick={handleButtonClick}
          className="uploadbtn"
        />
        <input
          type="file"
          ref={fileInput}
          multiple={"multiple"}
          accept=".jpg,.jpeg,.png"
          onChange={handleAddImages}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default StudentCertifiCation;
