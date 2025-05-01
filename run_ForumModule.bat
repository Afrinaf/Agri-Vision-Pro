@echo off



echo Starting Backend...
cd /d "AgriVisionProForum_BackEnd"
start cmd /k "npm start"






echo Starting Frontend...
cd /d "..\AgriVisionProForum_FrontEnd"
start cmd /k "npm start"

echo All services started successfully.
