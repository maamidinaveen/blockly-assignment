🚗 Vehicle Movement Simulation App
🧭 Overview

This project simulates a vehicle’s movement along a predefined route on an interactive map using React Leaflet.
It shows both:

The entire route path (from start to end), and

The vehicle’s live position, smoothly moving along the route.

The backend serves dummy GPS data using Express.js, and the frontend visualizes it in real-time.

🧰 Tech Stack
Frontend

⚛️ React.js

🗺️ React-Leaflet (for map rendering)

🧭 Leaflet.js (map engine)

💨 Tailwind CSS (optional styling)

🧮 Linear interpolation (lerp) for smooth animation

Backend

🟢 Node.js with Express.js

📂 File-based JSON data (dummy-route.json)

🌐 CORS enabled for local development

👇
📁 Final Project Structure — vehicle-tracker-app/

vehicle-tracker-app/
├── node_modules/ # Installed dependencies
│
├── public/
│ ├── dummy-route.json # Static route data file for frontend
│ └── index.html # Main HTML entry for React app
│
├── src/
│ ├── components/
│ │ ├── AnimatedMarker.jsx # Handles smooth vehicle marker animation
│ │ ├── Controls.jsx # UI controls (Play, Pause, Reset)
│ │ └── VehicleMap.jsx # Core map + route + animation logic
│ │
│ ├── App.jsx # Main wrapper component
│ ├── index.js # ReactDOM entry point
│ ├── index.css # Global and Tailwind styles
│ └── Utils.js # Helper functions (e.g., calculateSpeedKmH)
│
├── optional-backend/
│ └── server.js # Node + Express backend (serves /api/route)
│
├── package.json # React app dependencies and scripts
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js # Tailwind/PostCSS setup (if used)
├── README.md # Documentation and setup guide
└── .gitignore # Files/folders ignored by Git

Install dependencies

Backend

cd Optional-Backend

npm install

frontend

npm install

🚀 Running the Project
Step 1: Start the Backend Server
cd Optional-Backend - node server.js
Server will start on http://localhost:3001

Step 2: Start the Frontend
cd
npm start
Frontend will start on http://localhost:3000

🗺️ Features

✅ Interactive Map with React Leaflet
✅ Shows entire route path and vehicle’s traveled path
✅ Smooth vehicle animation between GPS points
✅ Fetches route data from Express backend
✅ Simple & beginner-friendly structure
✅ Realistic simulation effect (uses requestAnimationFrame for animation)
