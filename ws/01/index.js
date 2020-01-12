const { Server } = require("ws");

const server = new Server({ port: 8080 });
// console.log(server);

server.on("connection", ws => {
  //   console.log(ws);
  ws.on("message", message => {
    console.log("======= message");
    console.log(message);

    if (message === "hello") {
      ws.send("hello from server!!!");
    }
  });

  // 接続が切れた場合 -> clientが接続を切ったとき
  ws.on("close", (code, reason) => {
    console.log("I lost a client");
    console.log(code);
    console.log(reason);
  });
});
