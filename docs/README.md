# Server Metrics Backend

A simple Node.js, Express, and TypeScript backend for managing items, with SQLite for persistent storage and automated testing. This project demonstrates clean architecture, validation, error handling, and modern tooling for a junior backend developer assessment.

## Features
- RESTful CRUD API for items
- SQLite database (file-based for development, in-memory for tests)
- TypeScript with strict type checking
- Modular MVC structure
- Input validation and error handling
- Automated integration tests (Jest + Supertest)
- Linting and formatting (ESLint, Prettier)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm


### Installation
```sh
npm install
```

### Environment Variables
Copy the example environment file and update as needed:
```sh
cp .env.example .env
```
Edit `.env` to configure your environment variables (if needed).

### Database
- Development: Uses `data/items.db` (SQLite file)
- Testing: Uses in-memory SQLite (no files created)

### Running the Server
```sh
npm run dev
```
Server runs on `http://localhost:3000` by default.

### Running Tests
```sh
npm test
```

### Linting & Formatting
```sh
npm run lint      # Check code style
npm run lint:fix  # Auto-fix and remove unused imports
```

## API Endpoints

### Health Check
- `GET /health`
  - Response: `{ status: "ok", timestamp: "..." }`

### Items CRUD
- `GET /api/items` — List all items
- `GET /api/items/:id` — Get item by ID
- `POST /api/items` — Create item
  - Body: `{ name: string }`
- `PUT /api/items/:id` — Update item
  - Body: `{ name: string }`
- `DELETE /api/items/:id` — Delete item

#### Example Item Object
```json
{
  "id": 1,
  "name": "Example Item"
}
```

#### Example Requests
- Create:
  ```sh
  curl -X POST http://localhost:3000/api/items -H "Content-Type: application/json" -d '{"name":"Test"}'
  ```
- Update:
  ```sh
  curl -X PUT http://localhost:3000/api/items/1 -H "Content-Type: application/json" -d '{"name":"Updated"}'
  ```
- Delete:
  ```sh
  curl -X DELETE http://localhost:3000/api/items/1
  ```

## Project Structure
```
├── src/
│   ├── app.ts            # Express app setup
│   ├── server.ts         # Server entry point
│   ├── models/           # Database models
│   ├── controllers/      # Route handlers
│   ├── routes/           # API routes
│   ├── middlewares/      # Custom middleware
│   └── config/           # Config files
├── data/                 # SQLite database file
├── tests/                # Automated tests
├── docs/                 # Documentation
├── package.json
└── tsconfig.json
```

---

© 2026 Server Metrics Backend
