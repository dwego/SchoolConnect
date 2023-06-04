import express from "express";
import connectDB from "./src/database/connect";
import dotenv from "dotenv";
import app from "./src/app";

dotenv.config();

const main = async () => {
  try {
    console.log("Connecting to the database...");
    await connectDB();
    app();
  } catch (err) {
    console.error("Error connect to the database:", err);
  }
};

main();
