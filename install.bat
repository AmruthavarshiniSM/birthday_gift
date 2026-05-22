@echo off
echo.
echo ╔════════════════════════════════════════╗
echo ║  🎉 Birthday Gift Setup Script 🎉      ║
echo ║  Windows Installation                  ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo 📥 Please download and install from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version
echo.

REM Install Frontend Dependencies
echo 📦 Installing Frontend Dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed!
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed!
cd ..
echo.

REM Install Backend Dependencies
echo 📦 Installing Backend Dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed!
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed!
cd ..
echo.

echo ╔════════════════════════════════════════╗
echo ║  ✅ Installation Complete!             ║
echo ╚════════════════════════════════════════╝
echo.

echo 📖 Next Steps:
echo.
echo 🚀 To start the development servers:
echo.
echo   Terminal 1 (Frontend):
echo   cd client
echo   npm run dev
echo.
echo   Terminal 2 (Backend):
echo   cd server
echo   npm start
echo.
echo 🌐 Then open: http://localhost:5173
echo.
echo 📚 For more help, see:
echo    - QUICK_START.md
echo    - README.md
echo.

pause
