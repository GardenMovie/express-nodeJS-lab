# Server Metrics Backend

A simple Node.js + Express + TypeScript backend API for managing items (tutorial project foundation).

## Features
- RESTful CRUD API for items
- Input validation and error handling
- Centralized error middleware
- Health check endpoint (`/health`)
- Ready for extension to server metrics project

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Start (production)
```bash
npm start
```

## API Endpoints

### Items
- `GET    /api/items`         - List all items
- `POST   /api/items`         - Create a new item
- `GET    /api/items/:id`     - Get item by id
- `PUT    /api/items/:id`     - Update item by id
- `DELETE /api/items/:id`     - Delete item by id

### Health Check
- `GET    /health`            - Returns `{ status: "ok", timestamp: ... }`

## Environment Variables
See `.env.example` for required variables.

## License
MIT
