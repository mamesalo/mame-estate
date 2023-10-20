import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from './routes/listing.route.js';
import cookiParser from "cookie-parser";
dotenv.config();
mongoose
  .connect(process.env.MONGO) 
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());
app.use(cookiParser());
app.listen(3000, () => {
  console.log("server i running on port 3000");
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/listing', listingRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internet Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
