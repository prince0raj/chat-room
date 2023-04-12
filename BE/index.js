const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const port = 8000 || process.env.PORT;

const corsOptions = {
  origin: ["https://chat-0-rooms.netlify.app"],
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
const serve = http.createServer(app);
const io = new Server(serve, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx

  socket.on("joinroom", (room) => {
    socket.join(room);

    socket.on("newMessage", ({ newmssg, room }) => {
      // console.log(JSON.stringify(newmssg) + room);
      io.in(room).emit("getmssg", JSON.stringify(newmssg));
    });
  });
});

app.get("/", (req, res) => {
  res.send("hello from backend");
});

serve.listen(port, () => {
  console.log(`connected with the port ${port}`);
});
