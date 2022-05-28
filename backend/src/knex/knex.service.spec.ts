import { Test, TestingModule } from '@nestjs/testing'
import { KnexConfig } from './knex-config'
import { KnexService } from './knex.service'

describe('KnexService', () => {
	let service: KnexService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [KnexService, { provide: KnexConfig, useValue: { client: 'mysql2', connection: {} } }],
		}).compile()

		service = module.get<KnexService>(KnexService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should connect', () => {
		const result = service.connect()
		expect(result).toBeDefined()
	})
})
