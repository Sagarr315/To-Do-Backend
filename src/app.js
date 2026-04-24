const express = require("express");

const app = express();

// middleware
app.use(express.json());
// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));

app.get("/", (req, res) => {
  res.send("Server running successfully");
});

module.exports = app;