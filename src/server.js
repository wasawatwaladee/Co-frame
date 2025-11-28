import http from "http";
import { Server as IOServer } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";
import mainRouter from "./routes/main.route.js";
import notFoundMiddleware from "./middlewares/not-found.Middleware.js";
import errorMiddleware from "./middlewares/error.Middleware.js";
import { apiLimiter} from "./middlewares/rateLimiter.middleware.js";

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT || 5500;


const MOVIES = [
  {
    id: "bigbuck",
    title: "Big Buck Bunny 22",
    description: "Big Buck Bunny sample movie",
    thumbnail: "https://via.placeholder.com/320x180.png?text=Big+Buck+Bunny",
    poster:"https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg",
    video_url:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 596,
  },
  {
    id: "forbigger",
    title: "For Bigger Joyrides",
    description: "For Bigger Joyrides sample",
    thumbnail: "https://via.placeholder.com/320x180.png?text=For+Bigger+Joyrides",
    poster:"https://images-cdn.ispot.tv/ad/7TK8/default-large.jpg",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    duration: 600,
  },
  {
    id: "tears",
    title: "Tears of Steel",
    description: "Tears of Steel sample",
    thumbnail: "https://via.placeholder.com/320x180.png?text=Tears+of+Steel",
    poster:"https://resizing.flixster.com/oo9VGItEyVU48bUnUO23gvP5mrA=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10875273_v_h9_ac.jpg",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    duration: 732,
  },
];

// Routes to fetch movies
app.get("/movies", (req, res) => {
  res.json(MOVIES);
});

app.get("/movies/:id", (req, res) => {
  const m = MOVIES.find((x) => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: "not found" });
  res.json(m);
});

app.use("/api", apiLimiter, mainRouter )

//notfound middleware
app.use(notFoundMiddleware)

//error middleware
app.use(errorMiddleware)



/* Socket.io server */
const io = new IOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// In-memory room states
// rooms[roomId] = { movieId, playing, time, lastUpdate, chat: [ {sender, text, ts} ] }
const rooms = {};
let userCounter = 1;
const userNames = {};

io.on("connection", (socket) => {
  const username = `user${userCounter++}` 
  userNames[socket.id] = username;
  console.log("socket connected:", socket.id);
  console.log(`Assigned username ${username} to ${socket.id}`);


  // Join room (roomId is e.g. movie-{movieId}-{token})
  socket.on("join_room", ({ roomId, movieId }) => {
    socket.join(roomId);

    // If room not exists create initial state
    if (!rooms[roomId]) {
      rooms[roomId] = {
        movieId,
        playing: false,
        time: 0,
        lastUpdate: Date.now(),
        chat: [],
      };
    }

    // Compute actual time if playing (so late-joiners get current position)
    const state = rooms[roomId];
    const adjustedTime = state.playing
      ? state.time + (Date.now() - state.lastUpdate) / 1000
      : state.time;

    // send current state + chat history to the new participant
    socket.emit("room_state", {
      movieId: state.movieId,
      playing: state.playing,
      time: adjustedTime,
      lastUpdate: state.lastUpdate,
      chat: state.chat,
    });

    socket.emit("your name", username);

    console.log(`${socket.id} joined ${roomId}`);
  });

  // Player actions: play / pause / seek
  socket.on("player_action", ({ roomId, action, currentTime }) => {
    const state = rooms[roomId];
    if (!state) return;

    state.playing = action === "play";
    state.time = currentTime;
    state.lastUpdate = Date.now();

    // broadcast to everyone else in the room
    socket.to(roomId).emit("player_action", {
      action,
      currentTime,
      serverTime: Date.now(),
      test:2,
      roomId
    });
  });

  // Chat messages
  socket.on("send_chat", ({ roomId, text }) => {
    const sender = userNames[socket.id] || 'Unknown';
    const msg = {  sender , text, ts: Date.now() };
    rooms[roomId].chat.push(msg);

    // keep chat history bounded (optional)
    if (rooms[roomId].chat.length > 200) rooms[roomId].chat.shift();

    io.to(roomId).emit("receive_chat", msg);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected:", socket.id);
    // Optional: cleanup empty rooms — omitted for simplicity
  });
});

server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});