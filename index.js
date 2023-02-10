const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const authorize = require("./middleware/authorize");
const PORT = process.env.PORT || 5000;
const pool = require("./db");

app.use(cors());
app.use(express.json());

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
}

//update a message
app.put("/reply/:id", async (req, res) => {
  try {
    const { messageId } = req.params;
    const { reply, sender } = req.body;
    const updateMessage = await pool.query(
      "UPDATE messages SET reply_text = $1, sender = $2 WHERE message_id=$3",
      [reply, sender, messageId]
    );

    res.json(" message updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});

// Routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/dashboard", authorize, require("./routes/dashboard"));

// app.get("/*", function (req, res, next) {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   next();
// });

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
