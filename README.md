# Medicine Store — Admin Dashboard

A full-stack admin dashboard for a medical store. It provides authentication, a statistics overview, order management, products CRUD, suppliers management, and customer data with order history.

## 🚀 Live Demo

- **Frontend:** [https://medicine-store-swart.vercel.app/](https://medicine-store-swart.vercel.app/)
- **Backend API:** [https://medicine-store-f60g.onrender.com/api](https://medicine-store-f60g.onrender.com/api)
- **Health check:** [https://medicine-store-f60g.onrender.com/api/health](https://medicine-store-f60g.onrender.com/api/health)

### Demo credentials

```text
Email:    vendor@gmail.com
Password: vendor123
```

> ⚠️ The backend is hosted on Render's free tier and may take 30-60 seconds to wake up on the first request.

## 📑 Table of Contents

- [Live Demo](#-live-demo)
- [Pages](#-pages)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
  - [Auth](#auth)
  - [Dashboard](#dashboard)
  - [Orders](#orders)
  - [Products](#products)
  - [Suppliers](#suppliers)
  - [Customers](#customers)
- [Local Setup](#️-local-setup)
  - [Prerequisites](#prerequisites)
  - [1. Clone the repo](#1-clone-the-repo)
  - [2. Backend](#2-backend)
  - [3. Frontend](#3-frontend)
- [Seed Data](#-seed-data)
- [Scripts](#-scripts)
  - [Root](#root)
  - [Backend (server/)](#backend-server)
  - [Frontend (client/)](#frontend-client)
- [Authentication Flow](#-authentication-flow)
- [Responsive Design](#-responsive-design)
- [License](#-license)

## 📸 Pages

| Page      | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| Login     | Email/password form with validation and password visibility toggle       |
| Dashboard | Statistics cards, recent customers, income/expenses with internal scroll |
| Orders    | Table with name filter, status badges, pagination                        |
| Products  | Table with CRUD (create/edit/delete modals)                              |
| Suppliers | Table with create/edit modals and date picker                            |
| Customers | Table with row click → details modal (profile + order history)           |

## 🛠 Tech Stack

### Frontend

- **React 18** + **Vite**
- **React Router DOM v6** — routing
- **React Query (TanStack)** — server state, caching, mutations
- **React Hook Form** + **Yup** — forms and validation
- **MUI (Material UI)** — Dialog, DatePicker
- **CSS Modules** — scoped styling
- **Axios** — HTTP client with interceptors
- **Day.js** — date formatting
- **Inter** font (400 / 500 / 600)

### Backend

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** (jsonwebtoken) — stateless authentication
- **bcryptjs** — password hashing
- **Joi** — request validation
- **CORS**, **morgan**, **dotenv**

## 📁 Project Structure

```text
medicine-store/
├── client/                  # React frontend
│   ├── public/              # Static assets (favicon, sprite.svg, images)
│   └── src/
│       ├── api/             # Axios client, endpoints
│       ├── components/      # Reusable UI + page components
│       │   ├── customers/
│       │   ├── dashboard/
│       │   ├── layout/
│       │   ├── orders/
│       │   ├── products/
│       │   ├── suppliers/
│       │   └── ui/
│       ├── contexts/        # AuthContext
│       ├── hooks/           # React Query hooks (useProducts, useOrders, …)
│       ├── pages/           # Route pages
│       ├── schemas/         # Yup validation schemas
│       ├── theme/           # MUI theme
│       └── utils/           # Storage helpers
│
└── server/                  # Node.js backend
    └── src/
        ├── config/          # DB connection
        ├── controllers/     # Route handlers
        ├── data/            # Seed JSON files
        ├── middleware/      # auth, validate
        ├── models/          # Mongoose models
        ├── routes/          # Express routers
        ├── schemas/         # Joi schemas
        ├── scripts/         # seed.js
        └── utils/           # JWT helpers
```

## 🔌 API Endpoints

All protected endpoints require the header `Authorization: Bearer <token>`.

### Auth

| Method | Endpoint              | Description                                 |
| ------ | --------------------- | ------------------------------------------- |
| `POST` | `/api/user/login`     | Login, returns JWT and user info            |
| `GET`  | `/api/user/logout`    | Logout (client clears token; returns `204`) |
| `GET`  | `/api/user/user-info` | Current user info                           |

### Dashboard

| Method | Endpoint         | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| `GET`  | `/api/dashboard` | Stats, recent customers, income/expenses |

### Orders

| Method | Endpoint                         | Description                        |
| ------ | -------------------------------- | ---------------------------------- |
| `GET`  | `/api/orders?name=&page=&limit=` | List with name filter + pagination |

### Products

| Method   | Endpoint                           | Description              |
| -------- | ---------------------------------- | ------------------------ |
| `GET`    | `/api/products?name=&page=&limit=` | List + categories        |
| `POST`   | `/api/products`                    | Create product           |
| `PUT`    | `/api/products/:productId`         | Update product (partial) |
| `DELETE` | `/api/products/:productId`         | Delete product           |

### Suppliers

| Method | Endpoint                            | Description                        |
| ------ | ----------------------------------- | ---------------------------------- |
| `GET`  | `/api/suppliers?name=&page=&limit=` | List with name filter + pagination |
| `POST` | `/api/suppliers`                    | Create supplier                    |
| `PUT`  | `/api/suppliers/:supplierId`        | Update supplier (partial)          |

### Customers

| Method | Endpoint                            | Description                        |
| ------ | ----------------------------------- | ---------------------------------- |
| `GET`  | `/api/customers?name=&page=&limit=` | List with name filter + pagination |
| `GET`  | `/api/customers/:customerId`        | Customer details + order history   |

## ⚙️ Local Setup

### Prerequisites

- Node.js ≥ 18
- MongoDB Atlas cluster (or local MongoDB)

### 1. Clone the repo

```bash
git clone https://github.com/manilchuk/medicine-store.git
cd medicine-store
```

### 2. Backend

```bash
cd server
npm install
cp .env.example .env
```

Fill in `server/.env`:

```env
PORT=5000
MONGO_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/medicine-store
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Seed the database:

```bash
npm run seed
```

Start the server:

```bash
npm run dev
```

The server runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd ../client
npm install
cp .env.example .env
```

Fill in `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

The app runs on `http://localhost:5173`.

## 🧪 Seed Data

The seed script populates MongoDB with:

- 1 admin (`vendor@gmail.com` / `vendor123`) — password hashed with bcrypt
- 88 customers
- 53 products (deduplicated from 60, categories validated)
- 25 orders
- 5 suppliers
- 12 income/expense entries (including the `Error` type)

## 📝 Scripts

### Root

| Command                | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run client`       | Start the frontend dev server                 |
| `npm run server`       | Start the backend dev server                  |
| `npm run client:build` | Build the frontend for production             |
| `npm run install:all`  | Install dependencies for root, client, server |

### Backend (`server/`)

| Command         | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | nodemon with hot reload |
| `npm run start` | Production start        |
| `npm run seed`  | Populate the database   |

### Frontend (`client/`)

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Vite dev server          |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |

## 🔒 Authentication Flow

1. The user submits email and password → `POST /api/user/login`.
2. The server validates the data, compares the bcrypt hash and issues a JWT (valid for 7 days).
3. The client stores the token in `localStorage` under the key `medicine_token`.
4. An Axios interceptor attaches `Authorization: Bearer <token>` to every request.
5. On a `401` response, the client clears the token and redirects to `/login`.
6. Protected routes are guarded by `ProtectedRoute`; guest-only routes by `PublicRoute`.

## 📱 Responsive Design

Breakpoints per the design spec:

- **Mobile:** fluid from 320px, adaptive from 375px
- **Tablet:** from 768px
- **Desktop:** from 1440px

The sidebar is hidden on mobile and tablet and replaced by a burger-menu overlay (body scroll is locked while it is open).

## 📄 License

This project was built as a test assignment. Free to use for learning and portfolio purposes.
