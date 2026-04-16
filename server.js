// server.js - Fixed for Render + better compatibility
import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors({
  origin: '*',                    // Allow Vercel frontend (change later for security)
  methods: ['GET', 'POST', 'PUT']
}));
app.use(express.json());

// Optional: Serve static files if you have a public folder
// app.use(express.static(path.join(__dirname, 'public')));

// ... keep all your db data and routes exactly as they are ...

// WebSocket part is already good, but add a small health ping
wss.on('connection', (ws) => {
  console.log('New client connected');
  // ... your existing code ...

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Keep your API routes as they are (they look good)

// Final listening (important for Render)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket ready at wss://your-render-url.onrender.com`);
});// server.js - Fixed for Render + better compatibility
import express from 'express';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors({
  origin: '*',                    // Allow Vercel frontend (change later for security)
  methods: ['GET', 'POST', 'PUT']
}));
app.use(express.json());

// Optional: Serve static files if you have a public folder
// app.use(express.static(path.join(__dirname, 'public')));

// ... keep all your db data and routes exactly as they are ...

// WebSocket part is already good, but add a small health ping
wss.on('connection', (ws) => {
  console.log('New client connected');
  // ... your existing code ...

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Keep your API routes as they are (they look good)

// Final listening (important for Render)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket ready at wss://your-render-url.onrender.com`);
});
