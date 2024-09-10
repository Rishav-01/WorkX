import express from "express";
import connectDb from "./db.js";
const PORT = 3000;

const app = express();
app.use(express.json(), express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Hi");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});
