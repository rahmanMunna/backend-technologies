import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto.js';

// Same fields as CreateUserDto, but all optional.
// (PartialType from @nestjs/swagger also copies the API docs metadata.)
export class UpdateUserDto extends PartialType(CreateUserDto) {}
