import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from '../../redis/redis.service.js';
import { Product } from './entities/product.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

const CACHE_TTL = 60; // seconds
const ALL_PRODUCTS_KEY = 'products:all';
const productKey = (id: number) => `products:${id}`;

// Cache-aside: reads try Redis first, writes go to the DB and then clear the cache.
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly redis: RedisService,
  ) {}

  async findAll(): Promise<Product[]> {
    const cached = await this.redis.get(ALL_PRODUCTS_KEY);
    if (cached) {
      return JSON.parse(cached);
    }

    const products = await this.productsRepository.find({
      order: { id: 'ASC' },
    });
    await this.redis.set(ALL_PRODUCTS_KEY, JSON.stringify(products), CACHE_TTL);
    return products;
  }

  async findOne(id: number): Promise<Product> {
    const cached = await this.redis.get(productKey(id));
    if (cached) {
      return JSON.parse(cached);
    }

    const product = await this.findOneFromDb(id);
    await this.redis.set(productKey(id), JSON.stringify(product), CACHE_TTL);
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(dto);
    const saved = await this.productsRepository.save(product);
    await this.clearCache(); // the cached list is now missing this product
    return saved;
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOneFromDb(id);
    Object.assign(product, dto);
    const saved = await this.productsRepository.save(product);
    await this.clearCache(id);
    return saved;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOneFromDb(id);
    await this.productsRepository.remove(product);
    await this.clearCache(id);
  }

  // Writes must start from the real DB row, never from a cached copy.
  private async findOneFromDb(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  private async clearCache(id?: number): Promise<void> {
    await this.redis.delete(ALL_PRODUCTS_KEY);
    if (id !== undefined) {
      await this.redis.delete(productKey(id));
    }
  }
}
