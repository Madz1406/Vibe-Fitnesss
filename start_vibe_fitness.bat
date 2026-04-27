@echo off
REM Vibe Fitness - Full Stack Quick Start Script for Windows

echo.
echo ========================================
echo   🏋️  VIBE FITNESS - QUICK START
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js not found!
    echo Please download and install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Python not found!
    echo Please download and install Python from https://www.python.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Python found: 
python --version

echo.
echo ========================================
echo   INSTALLING DEPENDENCIES
echo ========================================
echo.

REM Install npm dependencies (if not already installed)
if not exist "node_modules" (
    echo 📦 Installing React dependencies...
    call npm install
    if errorlevel 1 (
        echo ❌ npm install failed!
        pause
        exit /b 1
    )
    echo ✅ React dependencies installed
) else (
    echo ✅ React dependencies already installed
)

REM Install Python dependencies
echo.
echo 🐍 Installing Python dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ pip install failed!
    pause
    exit /b 1
)
echo ✅ Python dependencies installed
cd ..

echo.
echo ========================================
echo   🚀 STARTING SERVERS
echo ========================================
echo.

REM Create a batch file to run both servers
echo @echo off > start_servers.bat
echo title Vibe Fitness - Frontend (npm run dev) >> start_servers.bat
echo echo. >> start_servers.bat
echo echo ========================================== >> start_servers.bat
echo echo   VIBE FITNESS - FRONTEND SERVER >> start_servers.bat
echo echo   Running on http://localhost:5173 >> start_servers.bat
echo echo ========================================== >> start_servers.bat
echo echo. >> start_servers.bat
echo npm run dev >> start_servers.bat

echo @echo off > start_backend.bat
echo title Vibe Fitness - Backend (Python) >> start_backend.bat
echo echo. >> start_backend.bat
echo echo ========================================== >> start_backend.bat
echo echo   VIBE FITNESS - BACKEND SERVER >> start_backend.bat
echo echo   Running on http://localhost:5000 >> start_backend.bat
echo echo ========================================== >> start_backend.bat
echo echo. >> start_backend.bat
echo cd backend >> start_backend.bat
echo python app.py >> start_backend.bat

echo.
echo ✅ Setup complete!
echo.
echo ========================================
echo   📋 MANUAL START (Recommended)
echo ========================================
echo.
echo Open TWO separate terminals and run:
echo.
echo Terminal 1 (Frontend):
echo   npm run dev
echo.
echo Terminal 2 (Backend):
echo   cd backend
echo   python app.py
echo.
echo Then open: http://localhost:5173
echo.
echo ========================================
echo   🤖 AUTOMATED START (One-Click)
echo ========================================
echo.
echo Would you like to start both servers automatically? (Y/N)
set /p choice=Enter your choice: 

if /i "%choice%"=="Y" (
    echo.
    echo Starting servers...
    
    REM Start frontend in new window
    start "Vibe Fitness Frontend" cmd /k npm run dev
    
    REM Wait a moment for frontend to start
    timeout /t 3 /nobreak
    
    REM Start backend in new window
    start "Vibe Fitness Backend" cmd /k "cd backend && python app.py"
    
    REM Wait for servers to start
    timeout /t 5 /nobreak
    
    echo.
    echo ✅ Both servers should be starting now!
    echo.
    echo 📱 Open your browser to:
    echo    http://localhost:5173
    echo.
    echo 📊 Backend API:
    echo    http://localhost:5000/api/health
    echo.
    echo Press any key to exit this window...
    pause
) else (
    echo.
    echo ℹ️  Manual start:
    echo.
    echo Terminal 1:
    echo   npm run dev
    echo.
    echo Terminal 2:
    echo   cd backend
    echo   python app.py
    echo.
    echo Press any key to exit...
    pause
)
