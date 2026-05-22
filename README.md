# 💖 Birthday Gift - Emotional Friendship Website

A stunning, fully interactive MERN stack application for celebrating friendship with cinematic animations, premium UI, and dramatic interactions. This is a complete, production-quality birthday surprise website for your best friend!

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-blue?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18-green?logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-blue?logo=tailwind-css)

## 🎨 Features

### Frontend Features
- ✨ **Animated Landing Page** - Cinematic entrance with glowing text and floating particles
- 🎯 **Interactive YES/NO Buttons** - Dynamic sizing, glow effects, and dramatic animations
- 💥 **NO Button Escape Logic** - Button evades cursor after 3 clicks with funny animations
- 🎉 **Celebration Page** - Explosive confetti, fireworks, and birthday message
- 🎨 **Premium UI** - Glassmorphism, neon glows, modern gradients
- 🚀 **Smooth Animations** - Framer Motion, GSAP, and custom CSS animations
- 📱 **Fully Responsive** - Beautiful on desktop and mobile devices
- 🌈 **Floating Effects** - Hearts, particles, sparkles, balloons, and emojis
- 🎵 **Music Toggle** - Mute/unmute audio controls
- ✨ **Mouse Trail Effects** - Sparkles follow the cursor
- 🎯 **Custom Scrollbar** - Gradient scrollbar styling

### Backend Features
- 🚀 **Express.js Server** - RESTful API with proper structure
- 📊 **Data Tracking** - Save button clicks, timestamps, and device info
- 🗄️ **MongoDB Support** - Optional database for storing celebration data
- 🔐 **CORS Enabled** - Secure cross-origin requests
- 📝 **Proper Controllers** - Clean separation of concerns
- 🛣️ **Structured Routes** - Well-organized API endpoints

## 🎯 Project Structure

```
birthday_gift/
│
├── client/                          # Frontend React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimatedBackground.jsx    # Gradient and particle effects
│   │   │   ├── FloatingHearts.jsx        # Falling hearts and emojis
│   │   │   ├── InteractiveButtons.jsx    # YES/NO button logic
│   │   │   └── CelebrationEffect.jsx     # Confetti and fireworks
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx          # Main greeting page
│   │   │   └── CelebrationPage.jsx      # Birthday celebration page
│   │   ├── assets/                      # Images and icons
│   │   ├── App.jsx                      # Main app component
│   │   ├── main.jsx                     # Entry point
│   │   └── index.css                    # Global styles
│   ├── public/                          # Static files
│   ├── index.html                       # HTML template
│   ├── package.json                     # Frontend dependencies
│   ├── vite.config.js                   # Vite configuration
│   ├── tailwind.config.js               # Tailwind CSS config
│   └── postcss.config.js                # PostCSS config
│
├── server/                          # Backend Node.js + Express
│   ├── routes/
│   │   └── celebrationRoutes.js     # API routes
│   ├── controllers/
│   │   └── celebrationController.js # Route handlers
│   ├── models/
│   │   └── Celebration.js           # MongoDB schema
│   ├── config/
│   │   └── mongodb.js               # Database connection
│   ├── server.js                    # Main server file
│   ├── package.json                 # Backend dependencies
│   └── .env.example                 # Environment variables template
│
└── README.md                        # Project documentation
```

## 📋 Tech Stack

### Frontend
- **React 18.2** - UI library
- **Vite 5.0** - Build tool
- **Tailwind CSS 3.3** - Styling
- **Framer Motion 10.16** - Animations
- **GSAP 3.12** - Advanced animations
- **Canvas Confetti 1.9** - Confetti effects
- **React Confetti 6.1** - Alternative confetti
- **Lottie React 2.4** - JSON animations
- **React Icons 4.11** - Icon library
- **Axios 1.6** - HTTP client
- **React Router DOM 6.17** - Navigation

### Backend
- **Node.js 18+** - Runtime
- **Express.js 4.18** - Framework
- **MongoDB 8.0** - Database (optional)
- **Mongoose 8.0** - ODM
- **dotenv 16.3** - Environment variables
- **CORS 2.8** - Cross-origin requests

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- (Optional) MongoDB running locally or cloud instance

### Step 1: Clone/Download Project
```bash
cd birthday_gift
```

### Step 2: Install Frontend Dependencies
```bash
cd client
npm install
```

### Step 3: Install Backend Dependencies
```bash
cd ../server
npm install
```

### Step 4: Setup Environment Variables (Optional - for MongoDB)
```bash
# In server/ folder, copy .env.example to .env
cp .env.example .env

# Edit .env and update MongoDB URI if needed
# MONGODB_URI=mongodb://localhost:27017/birthday-gift
```

## 🎮 Running the Application

### Option 1: Run Frontend Only (Quick Demo)
```bash
cd client
npm run dev
```
- Frontend will be available at: http://localhost:5173

### Option 2: Run Both Frontend & Backend (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
# or for development with auto-reload:
npm run dev
```
- Backend will be available at: http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
- Frontend will be available at: http://localhost:5173

### For Production Build

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

**Backend:**
```bash
cd server
npm start
```

## 📡 API Endpoints

### Health Check
```bash
GET /api/health
# Returns server status and timestamp
```

### Handle YES Click
```bash
POST /api/celebration/yes-click
Content-Type: application/json

{
  "timestamp": "2024-05-21T10:30:00Z",
  "userAgent": "Mozilla/5.0..."
}

# Response:
{
  "success": true,
  "message": "Thank you for saying YES! 🎉",
  "data": {
    "clickType": "YES",
    "timestamp": "2024-05-21T10:30:00Z",
    "emoji": "❤️"
  }
}
```

### Handle NO Click
```bash
POST /api/celebration/no-click
Content-Type: application/json

{
  "clickCount": 1,
  "timestamp": "2024-05-21T10:30:00Z",
  "userAgent": "Mozilla/5.0..."
}

# Response:
{
  "success": true,
  "message": "Really? 🥺",
  "data": {
    "clickType": "NO",
    "clickCount": 1,
    "timestamp": "2024-05-21T10:30:00Z",
    "emoji": "💔"
  }
}
```

### Get Statistics
```bash
GET /api/celebration/stats

# Response:
{
  "success": true,
  "data": {
    "totalClicks": 5,
    "yesClicks": 1,
    "noClicks": 4,
    "totalNoClickCount": 5,
    "message": "Statistics retrieved from database",
    "databaseConnected": true
  }
}
```

## 🎨 Website Features

### Landing Page
- **Heading Animation** - "Will You Be My Friend Again? ❤️" with glowing effects
- **Animated Background** - Gradient orbs, floating particles, mesh overlay
- **YES/NO Buttons** - Interactive buttons with glow and sizing animations
- **NO Button Behavior**:
  - 1st Click: Button shrinks, YES grows, popup "Really? 🥺"
  - 2nd Click: Button smaller, YES bigger, popup "Please accept my request 😭"
  - 3rd Click: Button tiny, YES huge, popup "Please 🥺💔"
  - 4th+ Clicks: Button escapes cursor with "Catch me if you can 😂"
- **Floating Effects** - Hearts, stars, sparkles, balloons
- **Floating Quotes** - Rotating friendship quotes
- **Music Toggle** - Sound control button
- **Mouse Trail** - Sparkles follow cursor

### Celebration Page
- **Success Message** - "I knew your answer would be YES ❤️🥺"
- **Confetti Burst** - Canvas confetti explosions
- **Fireworks** - Animated particle explosions
- **Birthday Message** - Rainbow gradient text: "Happy Birthday to my best friend Inosuke 🎂🎉💖"
- **Rotating Emojis** - Cake, balloons, gift, hearts, sparkles
- **Memory Grid** - Friendship, Laughter, Love, Adventures, Memories, Forever
- **Smooth Transitions** - All animations are cinematic and smooth

## 🎬 Animation Details

### Button Animations
- **Glow Effect** - Neon glow that pulses
- **Hover Animation** - Enhanced glow on hover
- **Scale Animation** - YES button grows, NO button shrinks
- **Shimmer Effect** - Gradient shimmer across buttons

### Background Animations
- **Gradient Orbs** - Floating, blurred gradient circles
- **Particle Movement** - Floating particles with opacity changes
- **Mesh Grid** - Animated background grid

### Celebration Effects
- **Heart Explosions** - Hearts burst from center
- **Balloon Rise** - Balloons float upward with rotation
- **Fireworks** - Colored particles burst outward
- **Text Animations** - Float, glow, bounce, rainbow gradient

## 🔧 Customization

### Change Birthday Name
Edit `client/src/pages/CelebrationPage.jsx`:
```jsx
Happy Birthday to my best friend Inosuke 🎂🎉💖
// Change "Inosuke" to desired name
```

### Change Color Scheme
Edit `client/tailwind.config.js` and component files to modify:
- Primary colors: Pink (#ff006e), Purple (#764ba2)
- Accent colors: Cyan (#00d4ff), Green (#00ff88), Gold (#ffd60a)

### Add Music
1. Place audio file in `client/public/`
2. Add audio player to `LandingPage.jsx`
3. Connect to music toggle button

### Customize Animations
- **Framer Motion** - Edit animations in component files
- **GSAP** - Add GSAP animations for more complex effects
- **Tailwind** - Modify keyframes in `tailwind.config.js`

## 📱 Responsive Design

- **Mobile First** - Designed for mobile devices
- **Tablet Support** - Optimized for tablets
- **Desktop Experience** - Full-featured on large screens
- **Touch Friendly** - Large touch targets and buttons
- **Landscape Mode** - Adapts to different orientations

## 🐛 Troubleshooting

### Frontend Not Loading
```bash
# Clear cache and reinstall
rm -rf client/node_modules client/package-lock.json
cd client && npm install
npm run dev
```

### Backend Connection Issues
```bash
# Check if backend is running on port 5000
curl http://localhost:5000/api/health

# If not running, start it:
cd server && npm run dev
```

### Port Already in Use
```bash
# Change port in vite.config.js (Frontend) or .env (Backend)
# Frontend: vite.config.js port: 5173 → port: 3000
# Backend: .env PORT=5000 → PORT=3001
```

### MongoDB Connection Error
```bash
# MongoDB is optional. The app works without it.
# If you want to use MongoDB:
# 1. Install MongoDB locally or use MongoDB Atlas
# 2. Update MONGODB_URI in server/.env
# 3. Restart server
```

## 🚀 Deployment

### Deploy Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the 'dist' folder
```

### Deploy Backend (Heroku/Railway/Render)
```bash
cd server
# Push to git and deploy
# Set environment variables on hosting platform
```

## 📝 Notes

- ✅ **No Database Required** - App works perfectly without MongoDB
- ✅ **Production Ready** - All code is optimized and production-quality
- ✅ **Error Handling** - Proper error handling throughout
- ✅ **Mobile Optimized** - Fully responsive and touch-friendly
- ✅ **Performance** - Smooth 60fps animations
- ✅ **SEO Ready** - Semantic HTML and meta tags
- ✅ **Accessibility** - Proper ARIA labels and keyboard support

## 🎓 Learning Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [React Official Guide](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Express.js Guide](https://expressjs.com)

## 💡 Future Enhancements

- [ ] Add music/sound effects
- [ ] Add photo gallery/memories section
- [ ] Add countdown timer to birthday
- [ ] Add guest book/comments section
- [ ] Add video message feature
- [ ] Add gift registry
- [ ] Add multiplayer YES/NO game
- [ ] Add live celebration counter

## 📄 License

This project is open source and free to use.

## 💖 Special Notes

This website is built with love and care to celebrate the special bond of friendship. Feel free to customize it for your best friend's birthday!

**Remember**: The most important part isn't the code or animations - it's the sentiment behind it. Use this website to let your friend know how much they mean to you! 💖✨

---

Made with ❤️ for unforgettable friendships 🎉
