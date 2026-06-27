# Big-O Project Setup

Big-O is a full-stack web application for analyzing the time and space complexity of code snippets.

## Project Structure

- frontend: React + Vite + TypeScript
- backend: Django + Django REST Framework

## Prerequisites

- Node.js 18 or newer
- npm
- Python 3.10 or newer
- pip
- virtualenv (recommended)

## 1. Clone the repository

```bash
git clone https://github.com/101rror/Big-O
cd Big-O
```

## 2. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at http://localhost:5173

### Frontend useful commands

```bash
npm run build
npm run lint
```

## 3. Backend setup

Open a new terminal and run:

```bash
cd backend
pip install -r requirements.txt
```

### Environment variables

Create a `.env` file inside the `backend` folder if you want to override the default settings.

Example:

```env
GEMINI_API_KEY=
DATABASE_URL=
```


### Run backend

```bash
python manage.py migrate
python manage.py runserver
```

The backend will run at http://localhost:8000

### Create an admin user

```bash
python manage.py createsuperuser
```

## 4. Development notes

- Start the frontend and backend in separate terminals.
- The frontend expects the backend API to be available at the configured API base URL.
- If you change Python dependencies, reinstall them using `pip install -r requirements.txt`.
