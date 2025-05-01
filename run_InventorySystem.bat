@echo off



echo Starting Backend...
cd /d "InventorySystem_Backend"
start cmd /k "npm start"






echo Starting Frontend...
cd /d "..\InventorySystem_frontend"
start cmd /k "npm start"

echo All services started successfully.
