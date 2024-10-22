import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import accounts from "./routers/accounts.router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const URI = process.env.DATABASE_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use("/accounts", accounts);

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database: ", err);
  });
