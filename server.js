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
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory database (simulated)
const db = {
  messages: [
    { id: 1, user: 'Flexi', avatar: '🎨', text: 'Welcome to the chatroom!', room: 'general', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, user: 'Dev', avatar: '💻', text: 'Let\'s build something amazing', room: 'general', timestamp: new Date(Date.now() - 1800000).toISOString() }
  ],
  projects: [
    {
      id: 1,
      name: 'Bamzy-Fx',
      description: 'Real-time Forex Dashboard with AI Signals',
      status: 'active',
      progress: 85,
      team: ['Flexi-Spec'],
      tech: ['Next.js', 'React', 'TailwindCSS'],
      image: '📊',
      analysis: {
        roi: '340%',
        users: '2.4K',
        engagement: '94%'
      }
    },
    {
      id: 2,
      name: 'Luxe Bites AI',
      description: 'AI-Powered Recipe Suggestions Platform',
      status: 'active',
      progress: 92,
      team: ['Flexi-Spec'],
      tech: ['React', 'Python', 'TailwindCSS'],
      image: '🍽️',
      analysis: {
        roi: '215%',
        users: '1.8K',
        engagement: '88%'
      }
    },
    {
      id: 3,
      name: 'FlexGlance',
      description: 'Smarter Weather Platform (No API Keys)',
      status: 'active',
      progress: 78,
      team: ['Flexi-Spec'],
      tech: ['Vue', 'Express', 'TailwindCSS'],
      image: '🌤️',
      analysis: {
        roi: '156%',
        users: '5.2K',
        engagement: '91%'
      }
    },
    {
      id: 4,
      name: 'Flexish Code Editor',
      description: 'Beginner-Friendly Web Code Editor',
      status: 'in-progress',
      progress: 65,
      team: ['Flexi-Spec'],
      tech: ['React', 'Monaco Editor', 'Node.js'],
      image: '📝',
      analysis: {
        roi: '89%',
        users: '890',
        engagement: '77%'
      }
    },
    {
      id: 5,
      name: 'Faith Platform Hub',
      description: 'Community-Driven Faith & Purpose-Driven Projects',
      status: 'launching',
      progress: 72,
      team: ['Flexi-Spec', 'Community'],
      tech: ['Next.js', 'Firebase', 'Stripe'],
      image: '✨',
      analysis: {
        roi: '0%',
        users: '450',
        engagement: '82%'
      }
    }
  ],
  articles: [
    {
      id: 1,
      title: 'Flexi Dev Studio: Journey of Ogunbiyi Jesutomisin',
      source: 'DEV Community',
      author: 'Ogunbiyi Jesutomisin',
      date: '2025-10-05',
      link: '#',
      tags: ['journey', 'web-dev', 'career'],
      excerpt: 'From block coding at 12 to building production-level apps...'
    },
    {
      id: 2,
      title: 'When Faith Meets the Feed: Building Purpose-Driven Apps',
      source: 'Medium',
      author: 'Flexi-Spec',
      date: '2025-11-12',
      link: '#',
      tags: ['faith', 'purpose', 'design'],
      excerpt: 'How to create digital experiences that align with your values...'
    },
    {
      id: 3,
      title: 'The Button That Changed Everything',
      source: 'Medium',
      author: 'Ogunbiyi Jesutomisin',
      date: '2025-09-20',
      link: '#',
      tags: ['growth', 'inspiration', 'design'],
      excerpt: 'A small UI decision that transformed the entire user experience...'
    },
    {
      id: 4,
      title: 'Building Cinematic Web Experiences with Tailwind & React',
      source: 'DEV Community',
      author: 'Flexi-Spec',
      date: '2025-08-15',
      link: '#',
      tags: ['tutorial', 'tailwind', 'react'],
      excerpt: 'Create stunning animations and micro-interactions with modern tools...'
    }
  ],
  tasks: [
    { id: 1, title: 'Design Luxury Dashboard UI', status: 'completed', priority: 'high', assignee: 'Flexi', dueDate: '2026-04-01', category: 'design' },
    { id: 2, title: 'Implement WebSocket Chat', status: 'in-progress', priority: 'high', assignee: 'Flexi', dueDate: '2026-04-15', category: 'backend' },
    { id: 3, title: 'Integrate Article Feed API', status: 'in-progress', priority: 'medium', assignee: 'Flexi', dueDate: '2026-04-12', category: 'integration' },
    { id: 4, title: 'Build Analytics Dashboard', status: 'pending', priority: 'medium', assignee: 'Flexi', dueDate: '2026-04-20', category: 'analytics' },
    { id: 5, title: 'PWA Service Worker Setup', status: 'completed', priority: 'high', assignee: 'Flexi', dueDate: '2026-04-05', category: 'infrastructure' },
    { id: 6, title: 'Admin Panel Security', status: 'pending', priority: 'critical', assignee: 'Flexi', dueDate: '2026-04-18', category: 'security' },
    { id: 7, title: 'Mobile Responsive Testing', status: 'in-progress', priority: 'high', assignee: 'Flexi', dueDate: '2026-04-16', category: 'testing' },
    { id: 8, title: 'Documentation & Guides', status: 'pending', priority: 'low', assignee: 'Flexi', dueDate: '2026-05-01', category: 'documentation' }
  ],
  users: []
};

// WebSocket connections
const clients = new Map();

wss.on('connection', (ws) => {
  const clientId = Date.now().toString();
  clients.set(clientId, ws);

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'chat') {
        const newMsg = {
          id: db.messages.length + 1,
          user: message.user || 'Anonymous',
          avatar: message.avatar || '👤',
          text: message.text,
          room: message.room || 'general',
          timestamp: new Date().toISOString()
        };
        db.messages.push(newMsg);

        // Broadcast to all connected clients
        clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(JSON.stringify({ type: 'new-message', data: newMsg }));
          }
        });
      }
    } catch (err) {
      console.error('WebSocket error:', err);
    }
  });

  ws.on('close', () => {
    clients.delete(clientId);
  });
});

// API Routes
app.get('/api/messages', (req, res) => {
  const room = req.query.room || 'general';
  const messages = db.messages.filter(m => m.room === room);
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { user, text, room, avatar } = req.body;
  const newMsg = {
    id: db.messages.length + 1,
    user: user || 'Anonymous',
    avatar: avatar || '👤',
    text,
    room: room || 'general',
    timestamp: new Date().toISOString()
  };
  db.messages.push(newMsg);
  res.json(newMsg);
});

app.get('/api/projects', (req, res) => {
  res.json(db.projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = db.projects.find(p => p.id === parseInt(req.params.id));
  res.json(project || { error: 'Not found' });
});

app.get('/api/articles', (req, res) => {
  res.json(db.articles);
});

app.get('/api/tasks', (req, res) => {
  const status = req.query.status;
  let tasks = db.tasks;
  if (status) tasks = tasks.filter(t => t.status === status);
  res.json(tasks);
});

app.put('/api/tasks/:id', (req, res) => {
  const task = db.tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    Object.assign(task, req.body);
    res.json(task);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Math.max(...db.tasks.map(t => t.id)) + 1,
    ...req.body,
    status: req.body.status || 'pending'
  };
  db.tasks.push(newTask);
  res.json(newTask);
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  const totalTasks = db.tasks.length;
  const completedTasks = db.tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = db.tasks.filter(t => t.status === 'in-progress').length;
  const totalProjects = db.projects.length;
  const avgProjectProgress = (db.projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects).toFixed(1);

  res.json({
    tasks: {
      total: totalTasks,
      completed: completedTasks,
      inProgress: inProgressTasks,
      pending: totalTasks - completedTasks - inProgressTasks,
      completionRate: ((completedTasks / totalTasks) * 100).toFixed(1) + '%'
    },
    projects: {
      total: totalProjects,
      avgProgress: avgProjectProgress,
      active: db.projects.filter(p => p.status === 'active').length
    },
    messages: {
      total: db.messages.length
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Flexi Dev Studio Backend running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket server ready for real-time updates`);
});
