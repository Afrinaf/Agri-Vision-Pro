@echo off



echo Starting Backend...
cd /d "InventorySystem_BackEnd"
start cmd /k "npm start"






echo Starting Frontend...
cd /d "..\InventorySystem_frontEnd"
start cmd /k "npm start"

echo All services started successfully.
