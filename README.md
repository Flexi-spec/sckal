# ⚡ Flexi Dev Studio - Premium PWA Platform

A **production-grade, installable progressive web app** built for **Flexi Dev Studio** by Ogunbiyi Jesutomisin. 

Features a **luxury cinematic UI**, real-time chat, project management, task tracking, analytics, and a separate admin dashboard.

---

## 🎯 Features

✅ **Multi-Page Application** - Home, Chat Room, Projects, Articles, Tasks, Analytics  
✅ **Real-Time Chat** - WebSocket-powered instant messaging with multiple rooms  
✅ **Project Management** - Explore projects with detailed analytics  
✅ **Task Management** - Create, track, and manage tasks with filtering  
✅ **Live Analytics** - System-wide statistics and insights  
✅ **Admin Dashboard** - Separate admin panel for management  
✅ **PWA Installable** - Install as native app on any device  
✅ **Offline Support** - Service Worker enables offline functionality  
✅ **Luxury UI** - Cinematic animations, gradients, and responsive design  
✅ **No External APIs** - Self-contained backend with no API keys needed  

---

## 📁 Project Structure

```
flexi-studio-pwa/
├── server.js              # Node.js/Express backend
├── index.html             # Main PWA app (multi-page)
├── admin.html             # Admin dashboard (separate)
├── sw.js                  # Service Worker (offline support)
├── manifest.json          # PWA manifest
├── package.json           # Dependencies
├── README.md              # This file
└── public/                # Static assets (optional)
```

---

## 🚀 Quick Start

### 1. **Installation**

```bash
# Clone or download the project
git clone <repo-url>
cd flexi-studio-pwa

# Install dependencies
npm install
```

### 2. **Run the Backend Server**

```bash
# Start the server (runs on http://localhost:3000)
npm start
```

You should see:
```
🚀 Flexi Dev Studio Backend running on http://localhost:3000
📡 WebSocket server ready for real-time updates
```

### 3. **Serve the Frontend**

In a **separate terminal**, serve the frontend files. Use any static server:

```bash
# Option A: Using Python
python -m http.server 8000

# Option B: Using Node.js (npx)
npx http-server

# Option C: Using Live Server (VS Code extension)
# Open index.html with Live Server
```

### 4. **Access the App**

- **Main App**: http://localhost:8000 (or your server URL)
- **Admin Dashboard**: http://localhost:8000/admin.html
- **Backend API**: http://localhost:3000/api/*

---

## 📡 API Endpoints

### Chat Messages
- `GET /api/messages?room=general` - Get messages for a room
- `POST /api/messages` - Send a new message

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project details

### Articles
- `GET /api/articles` - Get latest articles

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks?status=completed` - Filter by status
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task

### Analytics
- `GET /api/analytics` - Get system analytics

### Health Check
- `GET /api/health` - Server status

---

## 💻 Technology Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Service Worker API (offline support)
- PWA Manifest (installable)
- WebSocket API (real-time updates)

**Backend:**
- Node.js
- Express.js
- WebSocket (ws library)
- CORS enabled

**No External Dependencies:**
- No third-party CSS frameworks
- No build tools required
- No external APIs needed
- Zero API keys required

---

## 🎨 Design Features

### Color Palette
- **Primary**: `#ff6b35` (Vibrant Orange)
- **Secondary**: `#004e89` (Deep Blue)
- **Accent**: `#ffd700` (Gold)
- **Dark**: `#0a0a0a` (Near Black)

### Animations
- Smooth page transitions
- Glow effects on headings
- Hover animations on cards
- Staggered loading sequences
- Glassmorphism backgrounds

### Responsive Design
- Mobile-first approach
- Tablet optimized
- Desktop-grade experience
- Flexible grid layouts

---

## 📱 PWA Installation

### Web Browsers
1. Open the app in your browser
2. Click "Install App" button (top right)
3. Confirm installation
4. App appears on home screen

### Offline Features
- Service Worker caches essential files
- View cached pages when offline
- Automatic sync when reconnected
- Queue messages for sending

---

## 🛠️ Customization

### Update Project Data
Edit the `db` object in `server.js`:

```javascript
const db = {
  projects: [
    // Add/edit projects here
  ],
  articles: [
    // Add/edit articles here
  ],
  tasks: [
    // Add/edit tasks here
  ]
};
```

### Change Colors
Update CSS variables in the `<style>` section:

```css
:root {
  --primary: #ff6b35;
  --secondary: #004e89;
  --accent: #ffd700;
  /* ... */
}
```

### Add New Routes
Extend `server.js` with new Express routes:

```javascript
app.get('/api/custom', (req, res) => {
  res.json({ data: 'your data' });
});
```

---

## 🚢 Deployment

### Deploy Frontend (Vercel)
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys from GitHub
# Set up at https://vercel.com
```

### Deploy Backend (Heroku, Railway, Render)

**Using Heroku:**
```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Deploy
git push heroku main
```

**Using Render:**
1. Connect GitHub repo
2. Set start command: `node server.js`
3. Deploy

**Using Railway:**
1. Connect GitHub
2. Auto-detects Node.js
3. Deploy

---

## 🔐 Security Notes

- API runs on `localhost:3000` by default (change for production)
- Enable CORS on trusted domains only
- Use HTTPS in production
- Implement rate limiting for APIs
- Add authentication for admin dashboard

---

## 🐛 Troubleshooting

### Service Worker not registering?
- Ensure HTTPS (or localhost)
- Check browser console for errors
- Clear service worker cache

### WebSocket connection failed?
- Verify backend server is running
- Check firewall settings
- Ensure correct WebSocket URL

### APIs returning 404?
- Confirm backend is running on port 3000
- Check API endpoint paths
- Verify CORS settings

### Offline mode not working?
- Service Worker requires HTTPS or localhost
- Check cache manifest in DevTools
- Try force refresh (Ctrl+Shift+R)

---

## 📚 Useful Links

- **Flexi Dev Studio**: https://flexi-dev-studio.vercel.app
- **Founder**: https://flexi-spec.vercel.app
- **GitHub**: https://github.com/flexi-spec
- **Contact**: ogunbiyijesutomisin@gmail.com

---

## 📄 License

MIT License - Built with ♥️ by Ogunbiyi Jesutomisin (Flexi-Spec)

---

## 🎯 Next Steps

1. **Run the server**: `npm start`
2. **Open the app**: http://localhost:8000
3. **Explore features**: Navigate through all pages
4. **Admin access**: http://localhost:8000/admin.html
5. **Install as PWA**: Click "Install App" button

---

## 🚀 Advanced Usage

### Custom Chat Rooms
Add new rooms in `index.html`:
```html
<button class="room-btn" onclick="switchRoom('custom')">🎯 Custom Room</button>
```

### Add More Projects
Insert in `server.js` db.projects:
```javascript
{
  id: 6,
  name: 'Your Project',
  description: 'Description',
  status: 'active',
  progress: 85,
  // ... more fields
}
```

### Real-Time Analytics
Modify analytics endpoint in `server.js` to calculate:
- User engagement metrics
- Task completion rates
- Project health scores
- System performance stats

---

**Built with Vision, Code, and Coffee ☕**

Questions? Contact: ogunbiyijesutomisin@gmail.com
