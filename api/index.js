// import express from "express";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import listingRouter from "./routes/listing.routes.js";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";

import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

//mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.AZURE_MONGO) //MONGO  AZURE_MONGO
  .then(() => {
    console.log("Connected to Cosmos MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// connect to azure storage account
// const { BlobServiceClient } = require("@azure/storage-blob");
const SASToken =
  "sp=racwdli&st=2023-10-25T13:52:38Z&se=2023-11-29T21:52:38Z&sv=2022-11-02&sr=c&sig=Yv15cnoLVj%2FeAsboYULuX13WEckmsw%2FoN0z0chOcaxA%3D";
const accountName = "phase2stor";
const blobName = "homestor";
try {
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net/?${SASToken}`
  );
  const ContainerClient = blobServiceClient.getContainerClient({ blobName });
  console.log("connecting to azure storage account successfuly");
} catch (error) {
  console.log("Azure Storage Connection catch error=>>>>" + error.message);
}
//const __dirname = path.resolve();
//const express = require("express");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// app.use(express.static(path.join(__dirname, "/clinet/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "clinet", "dist", "index.html"));
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
