import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import listingRouter from './routes/listing.routes.js';

import cookieParser from 'cookie-parser';
import path from 'path';

import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";



dotenv.config();

const connStr = "DefaultEndpointsProtocol=https;AccountName=phase2stor;AccountKey=6urgyLshutIrfsUuQvXbViZC4piT1wBn6yVLEevypSgVSyXkchRvVuQgSRQgo3S6qx28tssY//1K+ASttoQ4Cw==;EndpointSuffix=core.windows.net";
const accountName="phase2stor";
const defaultAzureCredential = new DefaultAzureCredential();


const sas = "?sv=2022-11-02&ss=b&srt=sco&sp=rwdlaciytfx&se=2023-12-20T02:46:16Z&st=2023-10-26T18:46:16Z&spr=https,http&sig=NjawIBl4Hwm5Brw%2FoMUW9NUoxw614iNJmAFVH9SJ3p4%3D";

const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net${sas}`);

// const blobServiceClient = new BlobServiceClient(
//   `https://${accountName}.blob.core.windows.net`,
//   defaultAzureCredential
// );

//const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

let containers =await blobServiceClient.listContainers();
let i = 1;
for await (const container of containers) {
  console.log(`Container ${i++}: ${container.name}`);
}

mongoose
  .connect(process.env.AZURE_MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});



app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


// app.use(express.static(path.join(__dirname, '/clinet/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'clinet', 'dist', 'index.html'));
// })
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
