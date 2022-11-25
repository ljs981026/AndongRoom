const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const port = process.env.PORT || 5000;
const app = express();
const multer = require("multer");
const router = express.Router();
// app.use('./client/public/img')
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql2");
const path = require("path");
const storage = multer.diskStorage({
  destination: "./client/public/img/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect();

app.post("/upload", upload.single("img"), function (req, res, next) {
  res.send({
    fileName: req.file.filename,
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/api/sol_room", (req, res) => {
  connection.query("SELECT * FROM ANDONG_ROOM1", (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/api/non_room", (req, res) => {
  connection.query("SELECT * FROM ANDONG_ROOM2", (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/api/food", (req, res) => {
  connection.query("SELECT * FROM FOOD", (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/api/alchole", (req, res) => {
  connection.query("SELECT * FROM ALCHOL", (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/api/play", (req, res) => {
  connection.query("SELECT * FROM PLAY", (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/api/convinience", (req, res) => {
  connection.query("SELECT * FROM CONVINIENCE", (err, rows, fields) => {
    res.send(rows);
  });
});

// app.get("/api/room", (req,res) => {
//   connection.query("SELECT * FROM ANDONG_ROOM", (err, rows, fields) => {
//     res.send(rows);
//   })
// })

app.post("/api/room", (req, res, next) => {
  // console.log(req.body);
  let data = req.body.fd;
  if (req.body.fd.length === 0) {
    connection.query("SELECT * FROM andong_room", (err, rows, fields) => {
      res.send(rows);
    });
  }
  if (req.body.fd.length === 1) {
    let val = Object.values(data[0]);
    console.log(val);
    connection.query(
      `SELECT * FROM ANDONG_ROOM WHERE ${Object.keys(data[0])} = ?`,
      [val],
      (err, rows, field) => {
        res.send(rows);
      }
    );
  }
  if (req.body.fd.length === 2) {
    let val = Object.values(data[0]);
    let val2 = Object.values(data[1]);
    connection.query(
      `SELECT * FROM ANDONG_ROOM WHERE ${Object.keys(
        data[0]
      )} = ? AND ${Object.keys(data[1])} = ?`,
      [val, val2],
      (err, rows, field) => {
        res.send(rows);
      }
    );
  }
  if (req.body.fd.length === 3) {
    let val = Object.values(data[0]);
    let val2 = Object.values(data[1]);
    let val3 = Object.values(data[2]);
    connection.query(
      `SELECT * FROM ANDONG_ROOM WHERE ${Object.keys(
        data[0]
      )} = ? AND ${Object.keys(data[1])} = ? AND ${Object.keys(data[2])} = ?`,
      [val, val2, val3],
      (err, rows, field) => {
        res.send(rows);
      }
    );
  }
});

app.post("/api/member_update", (req, res) => {
  let user = req.body;
  connection.query(
    "INSERT INTO MEMBER(ID,NAME,EMAIL,TYPE,PASSWORD,RNAMES) VALUES(?,?,?,?,?,?)",
    [user.id, user.name, user.email, user.type, user.pw, user.rnames],
    (err, rows, fileds) => {
      if (err) {
        throw err;
      } else {
        res.send(rows); //프론트로 뿌려줌.
      }
    }
  );
});

app.get("/api/memberlist", (req, res) => {
  connection.query("SELECT * FROM MEMBER", (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/login", (req, res) => {
  console.log(req.body);
  let user = req.body;
  connection.query(
    `SELECT * FROM MEMBER WHERE ID = ? AND PASSWORD = ?`,
    [user.id, user.pw],
    (err, rows, fields) => {
      if (rows.length === 0) {
        res.send({ code: 400 });
      }
      console.log(rows[0].id);
      if (rows.length > 0) {
        if (rows[0].id === "admin98" && rows[0].password === "admin1234") {
          res.send({ code: 100, name: rows[0].name, id: rows[0].id });
        } else {
          res.send({ code: 200, name: rows[0].name, id: rows[0].id });
        }
      }
    }
  );
});

app.post("/api/idCheck", (req, res) => {
  console.log(req.body);
  let userid = req.body.id;
  connection.query(
    "SELECT * FROM MEMBER WHERE ID = ?",
    [userid],
    (err, rows, fields) => {
      console.log(rows);
      if (rows.length === 0) {
        res.send({ code: 404 });
      }
      if (rows.length === 1) {
        res.send({ code: 200 });
      }
    }
  );
});

app.post("/api/comment", (req, res) => {
  console.log(req.body);
  let text = req.body;
  console.log(typeof text.num, typeof text.text, typeof text.id);
  connection.query(
    "INSERT INTO comment(r_num, id, content, rating) VALUES(?,?,?,?)",
    [text.num, text.id, text.text, text.score],
    (err, rows, fields) => {
      connection.query(
        "SELECT * FROM COMMENT WHERE R_NUM = ?",
        [text.num],
        (err, rows, fields) => {
          console.log(rows[rows.length - 1]);
          res.send(rows);
        }
      );
    }
  );
});

app.post("/api/commentlist", (req, res) => {
  console.log(req.body, "번호");
  let num = req.body.num;
  connection.query(
    "SELECT * FROM COMMENT WHERE R_NUM = ?",
    [num],
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.post("/api/comment/delete", (req, res) => {
  let usercomment = req.body;
  console.log(req.body);
  console.log(usercomment);
  connection.query(
    "DELETE FROM COMMENT WHERE C_NUM = ? AND ID = ?",
    [usercomment.num, usercomment.id],
    (err, rows, fields) => {
      connection.query(
        "SELECT * FROM COMMENT WHERE R_NUM=?",
        [usercomment.r_num],
        (err, rows, fields) => {
          res.send(rows);
        }
      );
    }
  );
});

app.post("/api/comment/average", (req, res) => {
  let chat = req.body;
  console.log(chat, "dddd");
  connection.query(
    "SELECT RATING FROM COMMENT WHERE R_NUM = ?",
    [chat.num],
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.listen(port, () => console.log(`${port}번에 연결`));
