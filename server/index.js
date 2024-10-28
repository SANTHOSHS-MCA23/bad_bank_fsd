import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import user from "./routers/userRouter.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

mongoose.connect('mongodb://localhost/bank_mern')
  .then(() => console.log('Connected to MongoDB database...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use("/api/user", user);

app.listen(3000, () => {
  console.log(`Server is up and running on 3000 ...`);
  });
