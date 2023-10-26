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
  .connect("mongodb://phase2mongodb:Nubmsu2S8eq1y149NT6f7nqlrnLjBVkviaEUxDuGa7sCRnogS7mCFUAQWNyg0jvOZI3eeR1uTCNIACDbpS7RDQ==@phase2mongodb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@phase2mongodb@") //MONGO  AZURE_MONGO   process.env.AZURE_MONGO
  .then(() => {
    console.log("Connected to Cosmos MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// connect to azure storage account

const accountName = "phase2stor";
const containerName = "homestor";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  "6urgyLshutIrfsUuQvXbViZC4piT1wBn6yVLEevypSgVSyXkchRvVuQgSRQgo3S6qx28tssY//1K+ASttoQ4Cw==" //process.env.ACCOUNT_KEY
);

try {
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  );
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blockBlobClient = containerClient.getBlockBlobClient("pic5.jpg");
  const uploadBlobResponse = await blockBlobClient.uploadFile(
    "C:\\Users\\mames\\Desktop\\New folder\\pic.jpg"
  );
  console.log("blob added succesfully");
} catch (error) {}
const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
