import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';

@Entity('products')
export class Product extends BaseEntity {
  @ApiProperty({ example: 'Laptop' })
  @Column({ length: 150 })
  name: string;

  @ApiProperty({ example: '14 inch, 16GB RAM', type: String, nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  // Postgres returns decimals as strings, so convert back to a number.
  @ApiProperty({ example: 999.99 })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => Number(value),
    },
  })
  price: number;

  @ApiProperty({ example: 10 })
  @Column({ default: 0 })
  stock: number;
}
