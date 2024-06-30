import express from "express";
import { PORT } from "./src/config/index.js";
import mediaRoutes from "./src/routes/mediaRoutes.js";

const app = express();

app.use("/", mediaRoutes);

app.get("/", (req, res) => {
  res.send("Media Server is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
