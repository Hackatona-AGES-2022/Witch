export const KNEX_STUB_DEFAULT_ID = 3

export class KnexTableStub {
	table: jest.Mock
	where: jest.Mock
	insert: jest.Mock
	update: jest.Mock
	delete: jest.Mock
	select: jest.Mock
	first: jest.Mock
	transaction: jest.Mock
	transacting: jest.Mock

	constructor() {
		this.table = jest.fn().mockReturnThis()
		this.where = jest.fn().mockReturnThis()
		this.insert = jest.fn().mockReturnValue([KNEX_STUB_DEFAULT_ID])
		this.update = jest.fn().mockReturnThis()
		this.delete = jest.fn().mockReturnThis()
		this.select = jest.fn().mockReturnThis()
		this.first = jest.fn().mockReturnThis()
		this.transaction = jest.fn().mockReturnValue({ commit: jest.fn(), rollback: jest.fn() })
		this.transacting = jest.fn().mockReturnThis()
	}
}

export class KnexServiceStub {
	knex: KnexTableStub = new KnexTableStub()
	connect: jest.Mock

	constructor() {
		this.connect = jest.fn().mockReturnValue(this.knex)
	}
}
