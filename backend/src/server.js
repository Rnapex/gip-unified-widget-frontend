import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import { connectMongo }
  from "./db/mongo.js";

import widgetRoutes
  from "./routes/widget.routes.js";
  
import vehicleRoutes
  from "./routes/vehicle.routes.js";
  
  import quoteRoutes
  from "./routes/quote.routes.js";
  
const app = express();

app.use(cors());

app.use(
  "/api/widget",
  vehicleRoutes
);



app.use(express.json());

app.use(
  "/api/widget",
  widgetRoutes
);

const PORT =
  process.env.PORT || 5000;

async function startServer() {
  try {
    await connectMongo();
app.use(
  "/api/quote",
  quoteRoutes
);
    app.listen(PORT, () => {
      console.log(
        `Backend running on ${PORT}`
      );
    });

  } catch (error) {
    console.error(
      "SERVER START ERROR:",
      error
    );
  }
}

startServer();