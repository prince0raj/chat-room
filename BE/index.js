const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const port = 8000 || process.env.PORT;

app.use(cors());
const serve = http.createServer(app);
const io = new Server(serve, {
  cors: {
    origin: [
      "https://6436fa7fbe7d6316362b6ac1--chat-0-rooms.netlify.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
  },
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
