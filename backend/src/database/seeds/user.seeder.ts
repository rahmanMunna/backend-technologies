import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity.js';

export async function seedUsers(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(User);

  // Skip if data already exists, so the seeder is safe to run many times.
  if ((await repo.count()) > 0) {
    console.log('Users already seeded, skipping');
    return;
  }

  await repo.save([
    { name: 'Alice Johnson', email: 'alice@example.com' },
    { name: 'Bob Smith', email: 'bob@example.com' },
    { name: 'Charlie Brown', email: 'charlie@example.com', isActive: false },
  ]);
  console.log('Users seeded');
}
