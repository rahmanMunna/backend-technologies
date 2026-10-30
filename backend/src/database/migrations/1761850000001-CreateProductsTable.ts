import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1761850000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products" (
        "id"          SERIAL PRIMARY KEY,
        "name"        VARCHAR(150) NOT NULL,
        "description" TEXT,
        "price"       DECIMAL(10, 2) NOT NULL,
        "stock"       INTEGER NOT NULL DEFAULT 0,
        "created_at"  TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at"  TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
