// src/category/category.service.ts
import { Injectable } from '@nestjs/common';
import { Category } from './category.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
  private categories: Category[] = [];

  getAllCategories(): Category[] {
    return this.categories;
  }

  addCategory(name: string, description: string): Category {
    const newCategory = {
      id: uuidv4(),
      name,
      description,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
}
