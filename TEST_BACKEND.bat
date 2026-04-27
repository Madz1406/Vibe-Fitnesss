@echo off
REM Vibe Fitness - Backend Diagnostic Script

echo.
echo ========================================
echo  VIBE FITNESS - BACKEND DIAGNOSTICS
echo ========================================
echo.

REM Test 1: Check if backend is running
echo [1/4] Testing backend health check...
curl -s http://localhost:5000/api/health >nul 2>&1
if errorlevel 1 (
    echo ❌ FAILED: Cannot reach http://localhost:5000/api/health
    echo.
    echo This means the backend is NOT running.
    echo.
    echo FIX: Open a new terminal and run:
    echo      cd backend
    echo      python app.py
    echo.
    pause
    exit /b 1
) else (
    echo ✅ PASSED: Backend is running on http://localhost:5000
)

echo.
echo [2/4] Checking backend info...
curl -s http://localhost:5000/api/info >nul 2>&1
if errorlevel 1 (
    echo ❌ FAILED: Cannot access http://localhost:5000/api/info
) else (
    echo ✅ PASSED: Backend API is responding
)

echo.
echo [3/4] Testing Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ FAILED: Python not found
    echo.
    echo FIX: Download Python from https://www.python.org/
    echo.
    pause
    exit /b 1
) else (
    echo ✅ PASSED: Python is installed
    python --version
)

echo.
echo [4/4] Checking required packages...
python -c "import flask; import flask_cors; print('✅ PASSED: Flask packages installed')" 2>nul
if errorlevel 1 (
    echo ❌ FAILED: Flask packages not installed
    echo.
    echo FIX: Run in backend directory:
    echo      pip install -r requirements.txt
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  ✅ ALL CHECKS PASSED!
echo ========================================
echo.
echo Backend is running and ready!
echo Open http://localhost:5173 in your browser
echo and try generating a diet plan.
echo.
pause
