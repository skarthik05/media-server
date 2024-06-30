const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Media Server is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
