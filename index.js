const express = require("express");
const cors = require("cors");

const app = express();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const { authenticate } = require("./middleware/authenticate.middleware");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the full App");
});

app.use("/users", userRouter);

app.use(authenticate);

app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the Mongo Atlas Database..");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server running at port ${process.env.port}`);
});
