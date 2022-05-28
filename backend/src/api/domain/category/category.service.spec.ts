import { Test } from '@nestjs/testing'
import { KnexService } from '../../../knex/knex.service'
import { KnexServiceStub } from '../../../knex/knex.service.stub'
import { CategoryService } from './category.service'

describe('CategoryService', () => {
	let categoryService: CategoryService
	let knexService: KnexServiceStub

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [], // Add
			controllers: [], // Add
			providers: [CategoryService, { provide: KnexService, useClass: KnexServiceStub }], // Add
		}).compile()

		categoryService = moduleRef.get<CategoryService>(CategoryService)
		knexService = moduleRef.get<KnexServiceStub>(KnexService as never)
	})

	it('should be defined', () => {
		expect(categoryService).toBeDefined()
	})

	it('should find all', () => {
		categoryService.findAll()
		expect(knexService.connect).toHaveBeenCalled()
		expect(knexService.knex.select).toHaveBeenCalled()
	})

	it('should find by super category', async () => {
		await categoryService.findBySuperCategory(56)
		expect(knexService.connect).toHaveBeenCalled()
		expect(knexService.knex.where).toHaveBeenCalledWith('idSuperCategory', 56)
	})
})
