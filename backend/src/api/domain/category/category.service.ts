import { Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { BaseService } from '../../base/base.service'
import { KnexService } from '../../../knex/knex.service'
import { Category } from '../../../db/models/category.model'

@Injectable()
export class CategoryService extends BaseService<Category, number> {
	constructor(private knexService: KnexService) {
		super('idCategory')
	}

	findBySuperCategory(idSuperCategory: number): Promise<Category[]> {
		return this.table.where('idSuperCategory', idSuperCategory)
	}

	protected get table(): Knex.QueryBuilder<Category> {
		return this.knexService.connect().table('categories')
	}
}
