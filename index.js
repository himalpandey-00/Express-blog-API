require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8080;

app.use(express.json());

const blogsRoute = require("./routes/blogs");
const usersRoute = require("./routes/users");

app.use("/users", usersRoute);
app.use("/blogs", blogsRoute);

app.get("/", (req, res) => {
  res.send("Hello world.");
});

// Connect to the DB
mongoose.connect(process.env.DATABASE_URL, () =>
  console.log("Database connected")
);

app.listen(PORT, () => console.log(`Alive on http://localhost:${PORT}`));
