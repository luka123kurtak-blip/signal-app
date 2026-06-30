const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = Number(process.env.PORT) || 3001;

function isAllowedOrigin(origin) {
  const raw = process.env.CORS_ORIGIN || "*";
  if (raw === "*") return true;
  if (!origin) return true;

  return raw.split(",").some((pattern) => {
    const trimmed = pattern.trim();
    if (!trimmed) return false;
    if (trimmed.includes("*")) {
      const regex = new RegExp(
        `^${trimmed.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`
      );
      return regex.test(origin);
    }
    return trimmed === origin;
  });
}

const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
};

const app = express();
app.use(cors(corsOptions));
app.get("/health", (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
  pingInterval: 25000,
  pingTimeout: 20000,
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

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Signal backend listening on ${PORT}`);
});
