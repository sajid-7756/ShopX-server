import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./errorHandler.js";
import connectDB from "./db.js";
import itemsHandler from "./routeHandler/itemsHandler.js";
dotenv.config();
const app = express();

const port = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send("ShopX !");
});

// App Routes
app.use("/item", itemsHandler);

// Error Handler
app.use(errorHandler);

async function startServer(): Promise<void> {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
startServer();
