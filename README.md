# 📈 Stock Market Learning Platform (Monorepo)

A modern full-stack platform for learning stock market strategies, attending live sessions, and accessing advanced trading dashboards.

Built with a scalable **monorepo architecture** to support web and future mobile applications.

---

## 🚀 Features

- 🎓 Structured courses on stock market & trading strategies
- 📡 Live sessions with the instructor
- 📊 Interactive dashboards & analytics
- 💳 Paid subscriptions & secure payments
- 🔐 Authentication & authorization system
- ☁️ Media handling (Cloudinary integration)
- 📱 Future-ready (mobile app support planned)

---

## 🏗️ Monorepo Structure

This project uses **Turborepo + PNPM workspaces**.

```
.
├── apps/
│   ├── web/
│   │   └── campus/        # Main frontend application
│
├── packages/
│   ├── data/              # Database + caching + shared data layer
│   └── env/               # Environment variable validation
│
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

## 🧠 Tech Stack

### Frontend (`/apps/web/campus`)

- TanStack Start
- TanStack Router
- TanStack Query
- TanStack Form

### Backend

- Nitro (server engine)

### Database

- MySQL
- Abstracted via `/packages/data` for reuse across apps

### Monorepo Tooling

- Turborepo
- PNPM Workspaces

---

## 📦 Packages Overview

### `/packages/data`

- Centralized data layer
- Handles:
  - Database access
  - Caching
  - Shared business logic

- Designed for reuse across **web + future mobile apps**

### `/packages/env`

- Type-safe environment variable validation
- Prevents runtime config issues

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nirvikpurkait/sanjib-academy.git
cd sanjib-academy
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup environment variables

Create a `.env` file in the root:

```env
BETTER_AUTH_SECRET=
CAMPUS_BETTER_AUTH_URL=
STORAGE_BETTER_AUTH_URL=

DATABASE_URL=

JWT_ENCRYPTION_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RAZOR_PAY_KEY=
RAZOR_PAY_SECRET=
VITE_RAZOR_PAY_KEY=

CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

DOCKERHUB_USERNAME=
DOCKERHUB_ACCESS_TOKEN=

VITE_CAMPUS_APP_HOST=
```

---

## 🧪 Development

Run all apps in development mode:

```bash
pnpm dev
```

Run a specific app:

```bash
pnpm --filter {app-name} dev
```

---

## 🏗️ Build

```bash
pnpm build
```

---

## 🔍 Lint & Format

```bash
pnpm lint
pnpm format
```

---

## 🧩 Architecture Notes

- **Separation of concerns** via packages
- **Data layer abstraction** ensures portability across platforms
- **Env validation** prevents runtime failures
- **Turborepo caching** improves build performance

---

## 💳 Payments

- Razorpay integration for subscriptions
- Secure key handling via environment variables

---

## ☁️ Media Handling

- Cloudinary used for storing and serving media assets

---

## 🔐 Authentication

- Uses Better Auth (JWT + OAuth support)
- Google OAuth integration available

---

## 📱 Future Plans

- Mobile application (React Native / Expo)
- Expanded analytics dashboards
- Community features

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a PR

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

Built for a stock market education platform focused on simplifying trading strategies and financial literacy.

---

## ⭐ Notes

- This is a **scalable monorepo** designed for long-term growth
- New apps (like mobile) can plug into existing packages easily

---
