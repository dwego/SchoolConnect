import cookieParser from "cookie-parser";
import express from "express";
import path from "path";

const config = {
  middleware: [cookieParser(), express.json()],
  port: 4000,
};

export default config;
