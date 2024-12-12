// src/category/category.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): Category[] {
    return this.categoryService.getAllCategories();
  }

  @Post()
  addCategory(@Body() body: { name: string, description: string }): Category {
    return this.categoryService.addCategory(body.name, body.description);
  }
}
