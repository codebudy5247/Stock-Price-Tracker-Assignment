import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
import morgan from "morgan";
import cors from "cors";
import path from 'path'
import StockRouter from "./stock.route";
import connectDB from './connectDB';

const port = process.env.PORT || 1337;
const app = express();

// Middleware
// Body Parser
app.use(express.json({ limit: "10kb" }));

// Logger
app.use(morgan("dev"));

// Cors
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Routes
app.use("/api/stock", StockRouter);

// Testing
app.get("/health", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    message: "API is Up && Running 🚀🚀🚀",
  });
});


// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// });

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.listen(port, async () => {
  console.log(`🚀 Server started on port: ${port}`);
  connectDB();
});
