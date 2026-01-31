@echo off
echo --- Setting up Python Virtual Environment ---

REM Check if venv folder exists
if not exist "venv" (
    echo Creating virtual environment 'venv'...
    python -m venv venv
    echo Virtual environment created successfully.
) else (
    echo Virtual environment 'venv' already exists.
)

REM Install requirements
if exist "requirements.txt" (
    echo Installing requirements...
    .\venv\Scripts\python -m pip install --upgrade pip
    .\venv\Scripts\pip install -r requirements.txt
)

echo.
echo To activate the environment, run:
echo .\venv\Scripts\activate
echo.
pause