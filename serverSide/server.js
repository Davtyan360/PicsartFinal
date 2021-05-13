require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");

const app = express();

const urlRouter = require("./routes/urlRoutes");
const connections = require("./connections");
const auth = require("./authRout/auth")
const tokenw = require("./tokensWork/verifyToken");
const userPosts = require("./routes/userPosts");

app.use(cors({ origin: true, credentials: true }));
app.use(cookie());
app.use(express.json());

connections.connect(app);

app.use("/api/users", auth);
//app.use(tokenw);
app.use("/users",userPosts)
app.use("/", urlRouter);

//oehdola aj1264f
