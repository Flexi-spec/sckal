# ⚡ Flexi Dev Studio PWA - Quick Start Guide

## 🎯 Get Started in 5 Minutes

### Step 1️⃣: Download & Extract Files
- All files are ready in `/home/claude/`
- Files included:
  - `server.js` - Backend server
  - `index.html` - Main PWA app
  - `admin.html` - Admin dashboard
  - `sw.js` - Service Worker
  - `manifest.json` - PWA manifest
  - `package.json` - Dependencies

### Step 2️⃣: Install Dependencies
```bash
npm install
```

### Step 3️⃣: Start the Backend Server
```bash
npm start
```

Expected output:
```
🚀 Flexi Dev Studio Backend running on http://localhost:3000
📡 WebSocket server ready for real-time updates
```

### Step 4️⃣: Serve Frontend (New Terminal)
```bash
# Using Python
python -m http.server 8000

# OR using npx
npx http-server
```

### Step 5️⃣: Open in Browser
- **Main App**: http://localhost:8000
- **Admin**: http://localhost:8000/admin.html
- **API Docs**: http://localhost:3000/api/health

---

## 🎮 Features Demo

### Home Page
- Welcome screen with feature cards
- Quick access to all sections

### Chat Room 💬
- Real-time messaging
- Multiple rooms (General, Projects, Ideas, Support)
- Live updates via WebSocket

### Explore Projects 🚀
- Browse all projects
- View project analytics
- Track progress bars
- See team information

### Articles 📚
- Latest from Medium & Dev.to
- Sortable by date/source
- Tagged content

### Tasks ✅
- Create and manage tasks
- Filter by status
- Set priorities
- Track due dates

### Analytics 📊
- Real-time statistics
- System health metrics
- Task completion rates

### Admin Dashboard ⚙️
- System overview
- Project management
- Task administration
- Message moderation
- System logs

---

## 🔌 API Examples

### Get Messages
```bash
curl http://localhost:3000/api/messages?room=general
```

### Get Projects
```bash
curl http://localhost:3000/api/projects
```

### Get Analytics
```bash
curl http://localhost:3000/api/analytics
```

### Create Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "priority": "high",
    "dueDate": "2026-05-01",
    "category": "development"
  }'
```

---

## 🎨 Customize Colors

Open `index.html`, find CSS variables:

```css
:root {
  --primary: #ff6b35;    /* Main orange */
  --secondary: #004e89;  /* Blue accent */
  --accent: #ffd700;     /* Gold */
  --dark: #0a0a0a;       /* Background */
}
```

Change to your brand colors!

---

## 📱 Install as PWA

1. Open http://localhost:8000
2. Click "Install App" button (top right)
3. Confirm installation
4. App appears on your home screen
5. Works offline with Service Worker

---

## 📝 Edit Project Data

Open `server.js`, find this section:

```javascript
const db = {
  projects: [
    {
      id: 1,
      name: 'Your Project',
      description: 'Your description',
      status: 'active',
      progress: 85,
      // Add more fields as needed
    }
  ]
};
```

Edit and restart server.

---

## 🌐 Deploy to Production

### Frontend (Vercel)
1. Push to GitHub
2. Connect repo to Vercel
3. Auto-deploys on push

### Backend (Render)
1. Create account at https://render.com
2. Connect GitHub repo
3. Set start command: `node server.js`
4. Deploy

---

## 🔍 File Breakdown

| File | Purpose |
|------|---------|
| `server.js` | Express backend + WebSocket |
| `index.html` | Multi-page PWA app |
| `admin.html` | Admin management panel |
| `sw.js` | Offline caching |
| `manifest.json` | PWA metadata |
| `package.json` | Node dependencies |

---

## ✨ Key Features

✅ No external APIs needed  
✅ No API keys required  
✅ Works offline  
✅ Installable on any device  
✅ Real-time updates  
✅ Luxury UI design  
✅ Admin dashboard included  
✅ Fully responsive  

---

## 💡 Pro Tips

1. **Add more chat rooms** - Edit `switchRoom()` in index.html
2. **Change themes** - Modify CSS :root variables
3. **Add team members** - Extend db.users in server.js
4. **Custom analytics** - Add calculations to /api/analytics
5. **Database persistence** - Replace in-memory db with MongoDB/Firebase

---

## 🆘 Need Help?

- **Can't connect to server?** - Check if `npm start` is running
- **WebSocket error?** - Verify backend is on port 3000
- **Service Worker not working?** - Use HTTPS or localhost
- **CSS not loading?** - Hard refresh (Ctrl+Shift+R)

---

## 🎬 Demo Accounts

All features work out of the box with demo data:

- **Chat**: Message as "Flexi" or "Dev"
- **Projects**: 5 sample projects included
- **Tasks**: 8 demo tasks ready to track
- **Articles**: 4 sample articles loaded

---

## 🚀 Next Steps

1. Customize colors and branding
2. Add real project data
3. Integrate with your CMS
4. Deploy to production
5. Enable notifications
6. Add user authentication

---

**Happy Building! 🎉**

Built by Flexi Dev Studio | Made with ♥️
