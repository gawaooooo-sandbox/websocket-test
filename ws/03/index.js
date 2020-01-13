const { Server } = require("ws");

const isValidJson = value => {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
};

const server = new Server({ port: 8080 });
// console.log(server);

server.on("connection", ws => {
  //   console.log(ws);
  ws.on("message", message => {
    console.log("======= message");
    console.log(message);

    console.log("クライアントから name, age が送られる");
    // クライアントから受信
    const { name = "default", age = 20 } = isValidJson(message)
      ? JSON.parse(message)
      : {};
    console.log(name, age);

    // 送信してきたクライアントにのみ送信する
    ws.send(
      JSON.stringify({
        hoge: true,
        fuga: [1, 3, 5],
        piyo: 0.5
      })
    );

    // 複数のクライアントにデータ送信する
    server.clients.forEach(client => {
      client.send(`接続しているクライアント全てに送信！: ${name}`);
    });

    server.clients.forEach(client => {
      if (client !== ws) {
        client.send(
          `接続している自分以外のクライアント全てに送信！！！: ${age}`
        );
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
