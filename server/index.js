import express from "express";
import cors from "cors";
import session from "express-session";
import {
  Saloons,
  Services,
  Workers,
  Orders,
  Users,
  Ratings,
} from "./controller/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.set("trust proxy", 1); // trust first proxy if 0 then it will not trust any proxy
app.use(
  session({
    name: "session",
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // only send cookie over https if true
      maxAge: 6000,
    },
  })
);

app.use("/api/saloons", Saloons);
app.use("/api/services", Services);
app.use("/api/workers", Workers);
app.use("/api/orders", Orders);
app.use("/api/users", Users);
app.use("/api/ratings", Ratings);

app.use("/uploads", express.static("uploads"));

app.listen(3000);
