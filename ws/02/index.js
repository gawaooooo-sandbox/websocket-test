const { Server } = require("ws");

const server = new Server({ port: 8080 });
// console.log(server);

server.on("connection", ws => {
  //   console.log(ws);
  ws.on("message", message => {
    console.log("======= message");
    console.log(message);

    // 複数のクライアントにデータ送信する
    ws.send("送信してきたクライアントのみに返す");

    server.clients.forEach(client => {
      client.send("接続しているクライアント全てに送信！");
    });

    server.clients.forEach(client => {
      if (client !== ws) {
        client.send("接続している自分以外のクライアント全てに送信！！！");
      }
    });
  });

  // 接続が切れた場合 -> clientが接続を切ったとき
  ws.on("close", (code, reason) => {
    console.log("I lost a client");
    console.log(code);
    console.log(reason);
  });
});
