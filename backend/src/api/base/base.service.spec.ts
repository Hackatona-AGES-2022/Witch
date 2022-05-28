import { Knex } from 'knex'
import { KnexTableStub, KNEX_STUB_DEFAULT_ID } from '../../knex/knex.service.stub'
import { BaseService } from './base.service'

class Service extends BaseService<unknown, never> {
	constructor(private knexStub: KnexTableStub, id: never) {
		super(id)
	}

	table = this.knexStub as unknown as Knex.QueryBuilder
}

describe('BaseService', () => {
	let baseService: BaseService<unknown, never>
	let knexStub: KnexTableStub

	beforeEach(() => {
		knexStub = new KnexTableStub()
		baseService = new Service(knexStub, 'id' as never)
	})

	it('should create', () => {
		expect(baseService).toBeDefined()
	})

	it('should find by id', () => {
		baseService.findById(1 as never)
		expect(knexStub.where).toBeCalledWith('id', 1)
	})

	it('should create', () => {
		const data = { hey: 'hello' }
		baseService.create(data)
		expect(knexStub.insert).toHaveBeenCalledWith(data)
	})

	it('should update', () => {
		const data = { hey: 'hello' }
		baseService.update(data, KNEX_STUB_DEFAULT_ID as never)
		expect(knexStub.update).toHaveBeenCalledWith(data)
	})

	it('should find all', () => {
		baseService.findAll()
		expect(knexStub.select).toHaveBeenCalled()
	})
})
