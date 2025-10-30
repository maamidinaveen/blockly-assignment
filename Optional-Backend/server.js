const express = require("express");

const app = express();

const path = require("path");

const fs = require("fs");

const PORT = 3001;

const cors = require("cors");

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" })); // Assuming React runs on 3000

// API Endpoint to serve the dummy data

app.get("/api/route", async (request, response) => {
  try {
    const dbPath = path.join(__dirname, "dummy-route.json");
    const routeData = fs.readFileSync(dbPath, "utf-8");
    response.send(JSON.parse(routeData));
  } catch (error) {
    console.error("Error reading route file:", error);
    res.status(500).json({ message: "Could not load route data" });
  }
});

app.listen(PORT, () => {
  console.log(`Node server is running on http://localhost:${PORT}`);
});
