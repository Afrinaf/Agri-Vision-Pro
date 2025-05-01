@echo off



echo Starting Backend...
cd /d "BackEnd"
start cmd /k "npm start"






echo Starting Frontend...
cd /d "..\FrontEnd"
start cmd /k "npm start"

echo All services started successfully.
