@echo off
echo Starting Redis Server...
start cmd /k "redis-server.exe"

echo Starting Backend...
cd /d "backend"
start cmd /k "npm start"

echo Starting ML Service...
cd /d "..\ML"
call env\Scripts\activate
start cmd /k "uvicorn app:app --reload"

echo Starting Frontend...
cd /d "..\frontend"
start cmd /k "npm run dev"

echo All services started successfully.
