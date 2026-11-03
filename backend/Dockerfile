FROM node:24-alpine

WORKDIR /app

# Install dependencies first (cached unless package files change)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

EXPOSE 3000

# Apply pending migrations, then start the API.
# `exec` replaces the shell with node, so node becomes PID 1 and receives
# Docker's stop signal (SIGTERM) directly, with no npm/sh in between.
CMD ["sh", "-c", "npm run migration:run && exec node dist/main"]
