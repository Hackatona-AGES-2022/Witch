import { KNEX_STUB_DEFAULT_ID } from '../../../knex/knex.service.stub'

export class CategoryServiceStub {
	findBySuperCategory: jest.Mock
	constructor() {
		this.findBySuperCategory = jest.fn().mockResolvedValue([{ idCategory: KNEX_STUB_DEFAULT_ID }])
	}
}
