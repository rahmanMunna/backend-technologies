import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto.js';

// Same fields as CreateProductDto, but all optional.
// (PartialType from @nestjs/swagger also copies the API docs metadata.)
export class UpdateProductDto extends PartialType(CreateProductDto) {}
