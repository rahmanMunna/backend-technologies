import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto.js';

// Same fields as CreateProductDto, but all optional.
export class UpdateProductDto extends PartialType(CreateProductDto) {}
