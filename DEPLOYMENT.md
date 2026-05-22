# 🚀 Deployment Guide - Birthday Gift Website

## 📋 Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All features tested locally
- [ ] No console errors
- [ ] Responsive design verified on mobile
- [ ] Backend API tested
- [ ] Environment variables configured
- [ ] Build process tested
- [ ] All animations smooth
- [ ] Button interactions working
- [ ] Celebration effects displaying correctly
- [ ] Cross-browser tested (Chrome, Firefox, Safari)

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended - Easiest)

**Step 1: Prepare your code**
```bash
cd client
npm run build
```

**Step 2: Deploy**
```bash
npm install -g vercel
vercel
```

**Step 3: Configure**
- Select project folder: `client`
- Override settings: No
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: `dist`

**Environment Variables:**
```
VITE_API_URL=your-backend-url-here
```

✅ Your frontend is now live!

### Option 2: Netlify

**Step 1: Build**
```bash
cd client
npm run build
```

**Step 2: Deploy**
- Go to https://netlify.com
- Sign in/create account
- Drag and drop the `dist` folder
- Or connect GitHub repo for auto-deploy

**GitHub Auto-Deploy:**
1. Push code to GitHub
2. Connect repo to Netlify
3. Set build command: `npm install && npm run build`
4. Set publish directory: `dist`

**Environment Variables (in Netlify settings):**
```
VITE_API_URL=your-backend-url
```

### Option 3: AWS S3 + CloudFront

**Step 1: Build**
```bash
cd client
npm run build
```

**Step 2: Create S3 bucket**
- Go to AWS Console
- Create S3 bucket
- Enable static website hosting
- Upload `dist` folder contents

**Step 3: Create CloudFront distribution**
- Point to your S3 bucket
- Wait for deployment (5-10 mins)
- Your URL is ready!

### Option 4: GitHub Pages

**Step 1: Update vite.config.js**
```javascript
export default {
  base: '/birthday_gift/', // Replace with your repo name
  // ... rest of config
}
```

**Step 2: Build and deploy**
```bash
cd client
npm run build
npm install gh-pages --save-dev
npm run deploy
```

## 🖥️ Backend Deployment

### Option 1: Heroku (Free tier ending soon)

**Step 1: Prepare code**
- Ensure all dependencies in `package.json`
- Create `Procfile` in server folder:
```
web: npm start
```

**Step 2: Deploy**
```bash
heroku login
heroku create your-app-name
git push heroku main
```

**Environment Variables:**
```bash
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set PORT=5000
heroku config:set NODE_ENV=production
```

### Option 2: Railway.app (Recommended)

**Step 1: Sign up**
- Go to https://railway.app
- Sign in with GitHub

**Step 2: Deploy**
- Select `Deploy from GitHub`
- Select your repository
- Select the `server` folder
- Configure environment variables

**Environment Variables:**
- `MONGODB_URI` = your MongoDB connection string
- `NODE_ENV` = production
- `PORT` = will be auto-assigned

### Option 3: Render

**Step 1: Create service**
- Go to https://render.com
- Create new Web Service
- Connect GitHub repo
- Select `server` folder

**Step 2: Configure**
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables

**Environment Variables:**
```
MONGODB_URI=your-mongodb-uri
NODE_ENV=production
```

### Option 4: AWS EC2

**Step 1: Launch EC2 instance**
```bash
# SSH into instance
ssh -i your-key.pem ec2-user@your-instance

# Update system
sudo yum update -y
sudo yum install -y nodejs npm

# Clone repo
git clone your-repo-url
cd birthday_gift/server

# Install dependencies
npm install

# Start server
npm start
```

**With PM2 (for process management):**
```bash
npm install -g pm2
pm2 start server.js --name "birthday-gift"
pm2 startup
pm2 save
```

## 🗄️ Database Deployment

### MongoDB Atlas (Cloud)

**Step 1: Create cluster**
- Go to https://www.mongodb.com/cloud
- Create free account
- Create new cluster
- Wait for deployment

**Step 2: Configure**
- Add database user
- Add IP whitelist
- Create connection string

**Step 3: Use in backend**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

### MongoDB Local (Self-hosted)

```bash
# Install MongoDB
# Follow: https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod

# Create database
mongo
> use birthday-gift
> db.celebrations.insertOne({test: true})
```

## 🔐 Environment Variables Production

### Frontend (.env)
```
VITE_API_URL=https://your-backend-domain.com
VITE_API_TIMEOUT=30000
VITE_ENV=production
```

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

## 🔒 Security Checklist

- [ ] Remove console.log statements
- [ ] Set NODE_ENV=production
- [ ] Use HTTPS only
- [ ] Enable CORS properly (whitelist domains)
- [ ] Use environment variables for secrets
- [ ] Add input validation
- [ ] Use helmet.js for security headers
- [ ] Rate limit API endpoints
- [ ] Add authentication if needed
- [ ] Use secure MongoDB credentials

## 📊 Performance Optimization

### Frontend
```bash
# Build with optimizations
npm run build

# Analyze bundle size
npm install -g vite-plugin-visualizer
# Modify vite.config.js to include visualizer
```

### Backend
```bash
# Use compression
npm install compression

# Add to server.js:
import compression from 'compression'
app.use(compression())
```

## 🚨 Monitoring

### Frontend
- Use Google Analytics
- Monitor error tracking (Sentry)
- Check performance metrics

### Backend
- Monitor server logs
- Set up uptime monitoring
- Monitor API response times
- Track database performance

## 📈 Domain Configuration

### Using Custom Domain

**Vercel:**
1. Go to project settings
2. Add custom domain
3. Update DNS records
4. Wait for SSL certificate (5 mins)

**Netlify:**
1. Go to domain settings
2. Add custom domain
3. Update DNS records
4. SSL auto-configured

**AWS Route 53:**
1. Create hosted zone
2. Update domain registrar nameservers
3. Create records pointing to CloudFront
4. Configure SSL/TLS

## 📝 Post-Deployment

1. Test all features on live site
2. Verify API connections
3. Check animations on various devices
4. Monitor server logs
5. Set up error tracking
6. Configure backup system
7. Test mobile responsiveness
8. Verify CORS settings
9. Check redirect chains
10. Monitor performance metrics

## 🔄 Continuous Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build Frontend
        run: cd client && npm install && npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🎯 Common Issues & Solutions

### Issue: 404 on refresh
**Solution:** Configure server-side routing redirects
```
Redirect all routes to index.html for SPA
```

### Issue: API not connecting
**Solution:** Check CORS headers and environment variables
```javascript
// In server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}))
```

### Issue: Database connection timeout
**Solution:** Check MongoDB connection string and whitelist IP
```
Add your server's IP to MongoDB Atlas whitelist
```

### Issue: Slow animations
**Solution:** Enable Gzip compression and optimize assets
```bash
npm install compression
```

## 📞 Support Resources

- Vercel Support: https://vercel.com/support
- Netlify Support: https://support.netlify.com
- Railway Support: https://docs.railway.app
- MongoDB Support: https://docs.mongodb.com
- Express Support: https://expressjs.com
- React Support: https://react.dev

## ✅ Final Checklist

- [ ] Frontend deployed and live
- [ ] Backend deployed and live
- [ ] Database connected (if using)
- [ ] Environment variables configured
- [ ] Custom domain working
- [ ] SSL certificate active
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Team notified
- [ ] Documentation updated

---

**You're now ready for production! 🚀**

For issues, check deployment logs and error tracking services.

Good luck with your birthday surprise! 🎉💖
