# Backend (NestJS + TypeORM + PostgreSQL)

A simple practice API with two modules: **users** and **products**.

## Folder structure

```
src/
├── main.ts                      # app bootstrap (global prefix, validation)
├── app.module.ts                # root module: DB connection + feature modules
├── common/
│   └── entities/base.entity.ts  # id, created_at, updated_at shared by all tables
├── database/
│   ├── data-source.ts           # DB config, shared by app, CLI and seeder
│   ├── migrations/              # schema changes, applied in order
│   └── seeds/                   # sample data (seed.ts is the entry point)
└── modules/
    ├── users/
    │   ├── dto/                 # request body shapes + validation
    │   ├── entities/            # TypeORM entity (DB table)
    │   ├── users.controller.ts  # API layer: HTTP routes
    │   ├── users.service.ts     # service layer: business logic + DB access
    │   └── users.module.ts      # wires the pieces together
    └── products/                # same layout as users
```

Request flow: **Controller** (HTTP) → **Service** (logic) → **Repository** (DB).

## Run with Docker (easiest)

```bash
docker compose up -d --build        # starts Postgres + API, runs migrations
docker compose exec api npm run seed # optional: insert sample data
docker compose logs -f api           # watch logs
docker compose down                  # stop (add -v to also wipe the DB)
```

API: http://localhost:3000/api

## Run locally (DB in Docker, API on your machine)

```bash
cp .env.example .env
docker compose up -d db
npm install
npm run build
npm run migration:run
npm run seed
npm run start:dev
```

Migration and seed scripts run the compiled files in `dist/`, so run
`npm run build` after changing entities, migrations or seeds.

## Migrations

```bash
npm run migration:create -- src/database/migrations/AddPhoneToUsers  # new empty migration
npm run build && npm run migration:run                                # apply pending
npm run build && npm run migration:revert                             # undo the last one
```

## Endpoints

| Method | Path                | Description      |
| ------ | ------------------- | ---------------- |
| GET    | /api/users          | list users       |
| GET    | /api/users/:id      | get one user     |
| POST   | /api/users          | create user      |
| PATCH  | /api/users/:id      | update user      |
| DELETE | /api/users/:id      | delete user      |
| GET    | /api/products       | list products    |
| GET    | /api/products/:id   | get one product  |
| POST   | /api/products       | create product   |
| PATCH  | /api/products/:id   | update product   |
| DELETE | /api/products/:id   | delete product   |

Example:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Dave","email":"dave@example.com"}'
```
