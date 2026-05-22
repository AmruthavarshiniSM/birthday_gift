#!/bin/bash

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  🎉 Birthday Gift Setup Script 🎉      ║"
echo "║  Linux/Mac Installation                ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Please download and install from: https://nodejs.org"
    echo ""
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Install Frontend Dependencies
echo "📦 Installing Frontend Dependencies..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed!"
    exit 1
fi
echo "✅ Frontend dependencies installed!"
cd ..
echo ""

# Install Backend Dependencies
echo "📦 Installing Backend Dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed!"
    exit 1
fi
echo "✅ Backend dependencies installed!"
cd ..
echo ""

echo "╔════════════════════════════════════════╗"
echo "║  ✅ Installation Complete!             ║"
echo "╚════════════════════════════════════════╝"
echo ""

echo "📖 Next Steps:"
echo ""
echo "🚀 To start the development servers:"
echo ""
echo "   Terminal 1 (Frontend):"
echo "   cd client"
echo "   npm run dev"
echo ""
echo "   Terminal 2 (Backend):"
echo "   cd server"
echo "   npm start"
echo ""
echo "🌐 Then open: http://localhost:5173"
echo ""
echo "📚 For more help, see:"
echo "    - QUICK_START.md"
echo "    - README.md"
echo ""
