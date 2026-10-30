import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

// Same fields as CreateUserDto, but all optional.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
