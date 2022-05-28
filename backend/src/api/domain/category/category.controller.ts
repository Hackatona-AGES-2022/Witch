import { Controller, Get } from '@nestjs/common'
import { Category } from '../../../db/models/category.model'
import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	public findAll(): Promise<Category[]> {
		return this.categoryService.findAll()
	}
}
