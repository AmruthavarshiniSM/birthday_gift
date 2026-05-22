@echo off
REM Birthday Gift - Setup & Run Script
echo.
echo 🚀 Birthday Gift - Complete Setup
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install from https://nodejs.org
    exit /b 1
)

echo ✅ Node.js found: 
node --version
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd server
call npm install
if errorlevel 1 (
    echo ❌ Backend setup failed
    exit /b 1
)
echo ✅ Backend ready
cd ..

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
cd client
call npm install
if errorlevel 1 (
    echo ❌ Frontend setup failed
    exit /b 1
)
echo ✅ Frontend ready
cd ..

echo.
echo ═════════════════════════════════════════
echo ✅ ALL SETUP COMPLETE & VERIFIED! ✅
echo ═════════════════════════════════════════
echo.
echo 🚀 To run the application:
echo.
echo   Terminal 1 (Frontend):
echo     cd client
echo     npm run dev
echo.
echo   Terminal 2 (Backend):
echo     cd server
echo     npm start
echo.
echo 🌐 Then open: http://localhost:5173
echo.
pause
