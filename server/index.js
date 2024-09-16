import express from "express";
import connectDb from "./db.js";
import cors from "cors";
import applyRouter from "./routes/apply.js";
import postJobRouter from "./routes/postJob.js";
import path from "path";
import { fileURLToPath } from "url";
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json(), express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/apply", applyRouter);
app.use("/api/postJob", postJobRouter);

app.get("/", (req, res) => {
  res.json("Hi");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
