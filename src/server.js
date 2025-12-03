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

const rooms = {};
let userCounter = 1;
const userNames = {}; // userNames[socket.id] = "user1" or real email

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  const username = socket.handshake.auth?.username || `user${userCounter++}`;

  userNames[socket.id] = username;

  socket.emit("your_name",  userNames[socket.id]);
  console.log('username', username)
 
  

  /* ---------------------------
  JOIN ROOM
  ---------------------------- */

  socket.on("join_room", ({ roomId, movieId, roomPassword }) => {
    
    // 1. ตรวจสอบรหัสผ่าน
    if (rooms[roomId] && rooms[roomId].password !== roomPassword) {
      socket.emit("join_error", { message: "รหัสผ่านห้องไม่ถูกต้อง" });
      console.log(
        `Socket ${socket.id} failed to join room ${roomId}: Invalid password`
      );
      return;
    }

    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);

    // 2. สร้างห้องใหม่ถ้าไม่มี
    if (!rooms[roomId]) {
      rooms[roomId] = {
        movieId,
        playing: false,
        time: 0,
        lastUpdate: Date.now(),
        chat: [],
        password: roomPassword || null,
      };
    }

    // ⭐️ ลบ: Logic การตั้งชื่อซ้ำซ้อนใน join_room ออกไป
    // if (!userNames[socket.id]) {
    //   userNames[socket.id] = `user${userCounter++}`;
    // }

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
      yourName: userNames[socket.id], // ส่งชื่อที่ถูกต้อง
    });

     socket.emit("your_name", userNames[socket.id]);
     console.log('username from joinroom', username)

  });

  /* ---------------------------
  VIDEO ACTIONS
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
    const sender = userNames[socket.id] || "Unknown"; // ใช้ชื่อที่ถูกตั้งไว้
    console.log('sender', sender)

    const msg = {
      sender,
      text,
      ts: Date.now(),
      socketId: socket.id,
    };

    rooms[roomId]?.chat.push(msg);

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