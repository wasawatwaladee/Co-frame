import http from "http";
import { Server as IOServer } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 5500;

const io = new IOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

/* ==============================
   In-memory room states
   rooms[roomId] = {
     movieId, playing, time, lastUpdate,
     chat: [ { sender, text, ts } ]
   }
============================== */
const rooms = {};
let userCounter = 1; 
const userNames = {}; // userNames[socket.id] = "user1" or real email

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  const username = socket.handshake.auth?.username || `user${userCounter++}`;
   userNames[socket.id] = username;

  /* ---------------------------
        JOIN ROOM
  ---------------------------- */
  socket.on("join_room", ({ roomId, movieId }) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);

    // สร้างห้องใหม่ถ้าไม่มี
    if (!rooms[roomId]) {
      rooms[roomId] = {
        movieId,
        playing: false,
        time: 0,
        lastUpdate: Date.now(),
        chat: [],
      };
    }

    // ชื่อยังไม่ถูกตั้ง? → ตั้งเป็น UserX
    if (!userNames[socket.id]) {
      userNames[socket.id] = `user${userCounter++}`;
    }

    // sync video state ให้ผู้เข้าร่วมใหม่
    const state = rooms[roomId];
    const adjustedTime = state.playing
      ? state.time + (Date.now() - state.lastUpdate) / 1000
      : state.time;

    socket.emit("room_state", {
      movieId: state.movieId,
      playing: state.playing,
      time: adjustedTime,
      lastUpdate: state.lastUpdate,
      chat: state.chat,
    });

    // แจ้งชื่อให้ client
    socket.emit("your_name", userNames[socket.id]);
  });

  /* ---------------------------
        SET NAME
        (ส่งมาจาก Chat.jsx)
  ---------------------------- */
  // socket.on("set_name", ({ roomId, sender }) => {
  //   const finalName = sender || `user${userCounter++}`;
  //   userNames[socket.id] = finalName;

  //   console.log(`Set name for ${socket.id}: ${finalName}`);

  //   // แจ้ง client ว่าชื่ออะไร
  //   socket.emit("your_name", finalName);
  // });

  /* ---------------------------
        VIDEO ACTIONS
        play / pause / seek
  ---------------------------- */
  socket.on("player_action", ({ roomId, action, currentTime }) => {
    const state = rooms[roomId];
    if (!state) return;

    state.playing = action === "play";
    state.time = currentTime;
    state.lastUpdate = Date.now();

    socket.to(roomId).emit("player_action", {
      action,
      currentTime,
      serverTime: Date.now(),
    });
  });

  /* ---------------------------
        CHAT MESSAGE
  ---------------------------- */
  socket.on("send_chat", ({ roomId, text }) => {
    const sender = userNames[socket.id] || "Unknown";

    const msg = {
      sender,
      text,
      ts: Date.now(),
    };

    rooms[roomId]?.chat.push(msg);

    // จำกัดจำนวนประวัติแชท
    if (rooms[roomId]?.chat.length > 200) {
      rooms[roomId].chat.shift();
    }

    io.to(roomId).emit("receive_chat", msg);
  });

  /* ---------------------------
         DISCONNECT
  ---------------------------- */
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    delete userNames[socket.id];
  });
});

server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
