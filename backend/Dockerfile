FROM node:24-alpine

WORKDIR /app

# Install dependencies first (cached unless package files change)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

EXPOSE 3000

# Apply pending migrations, then start the API
CMD ["sh", "-c", "npm run migration:run && npm run start:prod"]
