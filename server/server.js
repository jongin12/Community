const http = require("http");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "stock5861!",
  charset: "utf8",
  database: "test",
  port: 3316,
});

const server = http.createServer(async (req, res) => {
  const method = req.method;
  const url = req.url;
  console.log(method);
  res.setHeader("Access-Control-Allow-Origin", "*");
  switch (method) {
    case "GET":
      if (url !== "/favicon.ico") {
        connection.query("SELECT * from login", (error, rows, fields) => {
          if (error) throw error;
          let json = JSON.stringify(rows);
          res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
          res.end(json);
        });
      }
      break;
    case "POST":
      console.log("object");
      if (url === "/signIn") {
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        req.on("end", () => {
          const params = new URLSearchParams(body);
          console.log(params);
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end("dd");
        });
        let id = "zxcv";
        let pw = "9999";
        // connection.query(
        //   `INSERT INTO login(user_id,user_pw) VALUES ('${id}','${pw}')`,
        //   (error, rows, fields) => {
        //     if (error) throw error;
        //     let json = JSON.stringify(rows);
        //     res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
        //     res.end(json);
        //   }
        // );
      }
      break;
    default:
      console.log("error");
      break;
  }
});

server.listen(4625, (err) => {
  if (err) throw err;
  console.log("server start..");
});