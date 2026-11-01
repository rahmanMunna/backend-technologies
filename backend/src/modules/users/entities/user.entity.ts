import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity.js';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ example: 'Alice Johnson' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ example: 'alice@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: true })
  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
