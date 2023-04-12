const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const port = 8000 || process.env.PORT;

const corsOptions = {
  origin: ["https://main--chat-0-rooms.netlify.app"],
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
const serve = http.createServer(app);
const io = new Server(serve, {
  cors: corsOptions,
});

// Set the Access-Control-Allow-Origin header to the client's origin
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://main--chat-0-rooms.netlify.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("joinroom", (room) => {
    socket.join(room);

    socket.on("newMessage", ({ newmssg, room }) => {
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
