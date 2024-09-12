import express from "express";
import connectDb from "./db.js";
import cors from "cors";
import applyRouter from "./routes/apply.js";
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

// Routes
app.use("/api/apply", applyRouter);

app.get("/", (req, res) => {
  res.json("Hi");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
