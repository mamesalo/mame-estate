// import express from "express";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.routes.js";
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";

import cookieParser from "cookie-parser";
import fs from "fs";

dotenv.config();

//mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.AZURE_MONGO) //MONGO  AZURE_MONGO   process.env.AZURE_MONGO
  .then(() => {
    console.log("Connected to Cosmos MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log("Server is running on port ");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);


 app.use(express.static(path.join(__dirname, "/clinet/dist")));

 app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "clinet", "dist", "index.html"));
 });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
