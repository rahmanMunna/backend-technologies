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

## Environment files

| File                   | Used by                              | In git? |
| ---------------------- | ------------------------------------ | ------- |
| `../.env`              | `docker-compose.yml` (repo root)     | no      |
| `../.env.example`      | template for the file above          | yes     |
| `backend/.env`         | running the API locally (`npm run …`) | no      |
| `backend/.env.example` | template for the file above          | yes     |

## Run with Docker (easiest)

Run these from the **repo root** (where `docker-compose.yml` lives):

```bash
cp .env.example .env                 # first time only, then edit the values
docker compose up -d --build         # starts Postgres + Redis + API, runs migrations
docker compose exec api npm run seed # optional: insert sample data
docker compose logs -f api           # watch logs
docker compose down                  # stop (add -v to also wipe the data)
```

API: http://localhost:3000/api

## Run locally (DB + Redis in Docker, API on your machine)

```bash
# from the repo root
docker compose up -d db redis

# from backend/
cp .env.example .env                 # first time only
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

## API docs (Scalar)

- Interactive docs: http://localhost:3000/docs
- Raw OpenAPI JSON: http://localhost:3000/openapi.json (import into Postman, etc.)

The spec is generated from `@nestjs/swagger` decorators (`@ApiProperty` on
DTOs and entities, `@ApiOperation` / `@Api*Response` on controller routes) and
rendered by Scalar. Setup lives in `src/config/api-docs.ts`. When you add a new
endpoint or field, add the matching decorator and it shows up in the docs.

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
