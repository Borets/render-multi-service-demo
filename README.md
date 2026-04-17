# Render Multi-Service Demo

Minimal two-service app for Render:

- `frontend/`: public Node web service that serves the UI and proxies `/api/message`
- `backend/`: Node API web service that returns JSON
- `render.yaml`: Render Blueprint that provisions both services

## Local run

Start the API:

```bash
cd backend
npm start
```

In a second terminal, start the frontend:

```bash
cd frontend
API_BASE_URL=127.0.0.1:10000 npm start
```

Then open `http://localhost:10000`.

## Render deploy

1. Put this repo on GitHub, GitLab, or Bitbucket.
2. In Render, create a Blueprint from the repo.
3. Render will create both services from `render.yaml`.
