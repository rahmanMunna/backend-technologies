import { DataSource } from 'typeorm';
import { Product } from '../../modules/products/entities/product.entity.js';

export async function seedProducts(dataSource: DataSource): Promise<void> {
  const repo = dataSource.getRepository(Product);

  if ((await repo.count()) > 0) {
    console.log('Products already seeded, skipping');
    return;
  }

  await repo.save([
    {
      name: 'Laptop',
      description: '14 inch, 16GB RAM',
      price: 999.99,
      stock: 10,
    },
    { name: 'Mouse', description: 'Wireless mouse', price: 19.5, stock: 100 },
    { name: 'Keyboard', price: 49.0, stock: 50 },
  ]);
  console.log('Products seeded');
}
