export class BaseServiceStub {
	create: jest.Mock
	findById: jest.Mock
	update: jest.Mock
	withTransaction: jest.Mock

	constructor() {
		this.create = jest.fn()
		this.findById = jest.fn()
		this.update = jest.fn()
		this.withTransaction = jest.fn()
	}
}
