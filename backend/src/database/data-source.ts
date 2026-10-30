import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../modules/users/entities/user.entity.js';
import { Product } from '../modules/products/entities/product.entity.js';

// Load .env when running locally. In Docker, env vars come from docker-compose.
if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

// One config shared by the Nest app, the TypeORM CLI (migrations) and the seeder.
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'backend_db',
  entities: [User, Product],
  migrations: [join(import.meta.dirname, 'migrations', '*.js')],
  // Schema is managed only by migrations, never auto-synced.
  synchronize: false,
  logging: false,
};

// Used by the TypeORM CLI: `typeorm migration:run -d dist/database/data-source.js`
export default new DataSource(dataSourceOptions);
