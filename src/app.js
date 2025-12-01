import express from "express";
import morgan from "morgan";
import cors from "cors";
import notFoundMiddleware from "./middlewares/not-found.Middleware.js";
import errorMiddleware from "./middlewares/error.Middleware.js";
import mainRouter from "./routes/main.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/coment.route.js";
import categoriesRoutes from "./routes/categories.route.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const MOVIES = [
  {
    id: "Spring",
    title: "Spring",
    description: "Spring sample movie",
    thumbnail:
      "https://studio.blender.org/files/cache/31/78/31783bc821b4c957fb8327a98c697c83.jpg",
    video_url:
      "https://rr2---sn-uvu-c33ek.googlevideo.com/videoplayback?expire=1764577709&ei=Tf0saYzfMp6ZsfIPvtmHiAE&ip=89.32.200.143&id=o-APNLm_jSSV_mPpX_wIeVZj8FytovV3Ow-ISweoVAKxaI&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&cps=0&rms=au%2Cau&bui=AdEuB5TtEKRsfOfyeP7R1A-Cw6CHWoPaObXgG0OxEpuTAmeraWEFZSPMoqUnDH8HNG0wy7U-UoPxTjl1&spc=6b0G_EjeDhCB7ybQ4IxNEst26nNYU_aAVUd9gBSM6963RLWLbkpfyk3-3hDAoTlbHDw&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&cnr=14&ratebypass=yes&dur=464.166&lmt=1708787334909738&fexp=51552689,51565116,51565681,51580968&c=ANDROID&txp=4438434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgA7_Qr6HzWryhdQ0Z-2PR5ErxGziBy9MgkwOdW1uwUDcCIH5ctheKZZ0ZRSwJhxSLppz7LFt1C7MOmhrPc7mJqKan&redirect_counter=1&rm=sn-a5me7d7z&rrc=104&req_id=635df2869724a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1764556115,&mh=7U&mip=180.180.232.6&mm=31&mn=sn-uvu-c33ek&ms=au&mt=1764555898&mv=m&mvi=2&pl=24&lsparams=cps,ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=APaTxxMwRAIgOQZOPHXEWMHVrmnwlpz7s7WsWDXL042v_bpoThsWXUUCIGuGOd6jPQtObucYuhAGzLcGK-kxOwALYE9UVjEwmDmt",
    duration: 596,
  },
  {
    id: "Charge",
    title: "Charge",
    description: "Charge sample movie",
    thumbnail:
      "https://studio.blender.org/files/cache/d9/c0/d9c022ec2424c446f273ce9be983bf20.jpg",
    video_url:
      "https://rr5---sn-aigl6nzr.googlevideo.com/videoplayback?expire=1764576948&ei=VPosafP3J_z2zLUPw4zEsAY&ip=23.27.208.83&id=o-AEyoETiGBMVWBLODsvLqzp0lXIgjr9sQZ5jwirMANpEQ&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AdEuB5RWcnv4Exlfqcjthrl1LTYc9V4vAFVSbFuV7hO8JVXbXksVlm_o_gL6fZIiyILDWy4gcdB9nTTC&spc=6b0G_E6wsjD7tdsDrg8peUrLkiltvxWDPkspXSkTNJy1GJ7CQ6i-J7aGvD1LCF1lDG0&vprv=1&svpuc=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=13021779&ratebypass=yes&dur=262.757&lmt=1726449666515458&fexp=51552689,51565116,51565682,51580968&c=ANDROID&txp=4538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhAO3Kd5aN8IqHWWYalRlA6PG43xLjszux3s504XXOMzlAAiEAxvnzCzUR7I92lRnKxRU3RL8g1X5jQPkaus13BKnve0w%3D&redirect_counter=1&rm=sn-p5qeer76&rrc=104&req_id=f73852858fe5a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1764555367,&mh=e3&mip=180.180.232.6&mm=31&mn=sn-aigl6nzr&ms=au&mt=1764554435&mv=D&mvi=5&pl=0&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=APaTxxMwRgIhAJo2Td8rjyrGE1HGVjwEDwpTw4L53YqqtfT3uYCR_w3FAiEA5qk-OvVssm0lGaCfUCcrKXnDrvcuFg5Jxw_gatXGUPM%3D",
    duration: 596,
  },
  {
    id: "bigbuck",
    title: "Big Buck Bunny 22",
    description: "Big Buck Bunny sample movie",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    duration: 596,
  },
  {
    id: "forbigger",
    title: "For Bigger Joyrides",
    description: "For Bigger Joyrides sample",
    thumbnail: "https://images-cdn.ispot.tv/ad/7TK8/default-large.jpg",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    duration: 600,
  },
  {
    id: "tears",
    title: "Tears of Steel",
    description: "Tears of Steel sample",
    thumbnail:
      "https://resizing.flixster.com/oo9VGItEyVU48bUnUO23gvP5mrA=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10875273_v_h9_ac.jpg",
    video_url:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    duration: 732,
  },
];

// Testpage
app.get("/", (req, res) => {
  res.send("Hello from homepage");
});

app.use("/api", mainRouter);
app.use("/api", mainRouter);

app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/categories", categoriesRoutes);

app.get("/movies", (req, res) => {
  res.json(MOVIES);
});
app.get("/movies/:id", (req, res) => {
  const m = MOVIES.find((x) => x.id === req.params.id);
  if (!m) return res.status(404).json({ error: "not found" });
  res.json(m);
});

//notfound middleware
app.use(notFoundMiddleware);

//error middleware
app.use(errorMiddleware);

export default app;
