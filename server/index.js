import express from "express";
import connectDb from "./db.js";
import cors from "cors";
import applyRouter from "./routes/apply.js";
import postJobRouter from "./routes/postJob.js";
const PORT = 3000;

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json(), express.urlencoded({ extended: true }));

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
