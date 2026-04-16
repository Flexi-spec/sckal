# DEPLOYMENT CONFIGURATIONS

## 1️⃣ HEROKU (Procfile)

Create file: `Procfile`

```
web: node server.js
```

Deploy:
```bash
heroku login
heroku create your-app-name
git push heroku main
```

---

## 2️⃣ VERCEL (vercel.json)

For frontend deployment, create: `vercel.json`

```json
{
  "buildCommand": "echo 'Frontend ready'",
  "outputDirectory": ".",
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "API_URL": "@api_url"
  }
}
```

Deploy:
```bash
npm i -g vercel
vercel
```

---

## 3️⃣ RENDER (render.yaml)

Create file: `render.yaml`

```yaml
services:
  - type: web
    name: flexi-studio-api
    env: node
    startCommand: node server.js
    plan: free
    preDeployCommand: npm install
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
```

---

## 4️⃣ RAILWAY (railway.json)

```json
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "node server.js",
    "restartPolicy": "always",
    "numReplicas": 1
  }
}
```

---

## 5️⃣ ENVIRONMENT VARIABLES

Create: `.env`

```
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://your-frontend-domain.com
API_LOG_LEVEL=info
```

Update `server.js` to use:

```javascript
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
```

---

## 6️⃣ DOCKER (Dockerfile)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t flexi-studio .
docker run -p 3000:3000 flexi-studio
```

---

## 7️⃣ GITHUB ACTIONS CI/CD

Create: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - name: Deploy to Render
        env:
          RENDER_DEPLOY_KEY: ${{ secrets.RENDER_DEPLOY_KEY }}
        run: |
          curl -X POST https://api.render.com/deploy/srv-xxxxx \
            -H "Authorization: Bearer $RENDER_DEPLOY_KEY"
```

---

## 8️⃣ NGINX REVERSE PROXY

For production, proxy requests:

```nginx
upstream api_backend {
    server localhost:3000;
}

server {
    listen 80;
    server_name api.flexi-studio.com;

    location / {
        proxy_pass http://api_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /socket.io {
        proxy_pass http://api_backend/socket.io;
        proxy_http_version 1.1;
        proxy_buffering off;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## 9️⃣ SSL CERTIFICATE (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d api.flexi-studio.com
```

---

## 🔟 DATABASE MIGRATION (Optional)

Replace in-memory DB with MongoDB:

```javascript
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI);

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: String,
  progress: Number
});

const Project = mongoose.model('Project', projectSchema);

// Use Project.find() instead of db.projects
```

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] Update API URLs in index.html
- [ ] Change CORS settings
- [ ] Enable HTTPS/SSL
- [ ] Set environment variables
- [ ] Test all features
- [ ] Monitor error logs
- [ ] Set up backups
- [ ] Configure rate limiting
- [ ] Add authentication
- [ ] Monitor performance

---

**Ready to deploy? Choose your platform above! 🚀**
