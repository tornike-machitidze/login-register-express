import express from "express";
import mongodb from "./db/mongodb.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import userRouter from "./routes/userRoutes.js";

const app = express();
mongodb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicPath = path.join(__dirname, "../frontend");

app.use(express.json());
app.use(express.static(publicPath + "/views"));
app.use("/css", express.static(publicPath + "/css"));
app.use("/js", express.static(publicPath + "/js"));

app.use(userRouter);

app.listen(3000, () => {
  console.log("Server is up and runnin on port 3000");
});
