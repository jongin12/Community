const http = require("http");
const mysql = require("mysql");
const qs = require("querystring");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "stock5861!",
  //집 : stock586!
  //학원 : stock5861!
  charset: "utf8",
  database: "test",
  port: 3316,
});

const server = http.createServer(async (req, res) => {
  const method = req.method;
  const url = req.url;
  console.log(method + " " + url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  switch (method) {
    case "GET":
      if (url.startsWith("/login")) {
        let id = url.split("/")[2];
        connection.query(
          `SELECT * from login where user_id = '${id}'`,
          (error, rows, fields) => {
            if (error) throw error;
            let json = JSON.stringify(rows);
            res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
            res.end(json);
          }
        );
      } else if (url.startsWith("/cafeList")) {
        if (url === "/cafeList") {
          connection.query(`SELECT * from cafe_list`, (error, rows, fields) => {
            if (error) throw error;
            let json = JSON.stringify(rows);
            res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });
            res.end(json);
          });
        } else {
          let id = url.split("/")[2];
          connection.query(
            `SELECT * FROM cafe_list WHERE cafe_index = ANY(SELECT cafe_index FROM join_cafe WHERE user_index = ANY(SELECT user_index FROM login WHERE user_id = '${id}'))`,
            (error, rows, fields) => {
              if (error) throw error;
              let json = JSON.stringify(rows);
              res.writeHead(200, {
                "Content-Type": "text/json; charset=utf-8",
              });
              res.end(json);
            }
          );
        }
      }
      break;
    case "POST":
      if (url === "/signIn") {
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        req.on("end", () => {
          console.log(body);
          let abc = body.split('"');
          let id = abc[3];
          let pw = abc[7];
          connection.query(
            `INSERT INTO login(user_id,user_pw) VALUES ('${id}','${pw}')`,
            (error, rows, fields) => {
              if (error) throw error;
              let json = JSON.stringify(rows);
              res.writeHead(200, {
                "Content-Type": "text/json; charset=utf-8",
              });
              res.end(json);
            }
          );
        });
      } else if (url === "/makeCafe") {
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        req.on("end", () => {
          let abc = body.split('"');
          let name = abc[3];
          let manager = abc[7];
          connection.query(
            `INSERT INTO cafe_list(cafe_name,cafe_manager) VALUES ('${name}','${manager}')`,
            (error, rows, fields) => {
              if (error) {
                if (error.code === "ER_DUP_ENTRY") {
                  let json = JSON.stringify({ error: "카페명 중복" });
                  res.writeHead(200, {
                    "Content-Type": "text/json; charset=utf-8",
                  });
                  res.end(json);
                }
                // 카페명 중복 에러 처리
              } else {
                connection.query(
                  `INSERT INTO test.join_cafe(user_index,cafe_index,admin) VALUES ((SELECT user_index FROM login where user_id = '${manager}'),(SELECT cafe_index FROM cafe_list where cafe_name = '${name}'),'true')`,
                  (error, rows, fields) => {
                    if (error) throw error;
                  }
                );
                let json = JSON.stringify(rows);
                res.writeHead(200, {
                  "Content-Type": "text/json; charset=utf-8",
                });
                res.end(json);
              }
            }
          );
        });
      } else if (url === "/joinCafe") {
        let body = "";
        req.on("data", (data) => {
          body += data;
        });
        req.on("end", () => {
          let abc = body.split('"');
          let user = abc[3];
          let cafe = abc[7];
          // connection.query(
          //   `INSERT INTO login(user_id,user_pw) VALUES ('${id}','${pw}')`,
          //   (error, rows, fields) => {
          //     if (error) throw error;
          //     let json = JSON.stringify(rows);
          //     res.writeHead(200, {
          //       "Content-Type": "text/json; charset=utf-8",
          //     });
          //     res.end(json);
          //   }
          // );
          let json = JSON.stringify({
            test: "dd",
          });
          res.writeHead(200, {
            "Content-Type": "text/json; charset=utf-8",
          });
          res.end(json);
        });
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
