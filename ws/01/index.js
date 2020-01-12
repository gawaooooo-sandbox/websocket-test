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
});
