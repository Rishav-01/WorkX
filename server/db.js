import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Db connected"))
    .catch((err) => console.log("Error while connecting to MongoDb"));
};

export default connectDb;
