const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
  host: "0.0.0.0",
});

io.on("connection", (socket) => {
  socket.on("join-sender", () => {
    socket.leave("receivers");
    socket.join("senders");
  });

  socket.on("join-receiver", () => {
    socket.leave("senders");
    socket.join("receivers");
  });

  socket.on("ring", () => {
    if (!socket.rooms.has("senders")) return;
    io.to("receivers").emit("play-sound");
  });
});

console.log("Socket running on 3001");
