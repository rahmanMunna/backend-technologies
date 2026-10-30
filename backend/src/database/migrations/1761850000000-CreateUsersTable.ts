import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1761850000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id"         SERIAL PRIMARY KEY,
        "name"       VARCHAR(100) NOT NULL,
        "email"      VARCHAR NOT NULL UNIQUE,
        "is_active"  BOOLEAN NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
