import dataSource from '../data-source.js';
import { seedUsers } from './user.seeder.js';
import { seedProducts } from './product.seeder.js';

// Entry point: `npm run seed`
async function runSeeders() {
  await dataSource.initialize();

  try {
    await seedUsers(dataSource);
    await seedProducts(dataSource);
  } finally {
    await dataSource.destroy();
  }
}

await runSeeders();
