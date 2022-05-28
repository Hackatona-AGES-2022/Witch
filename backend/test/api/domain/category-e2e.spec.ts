import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../../../src/app.module'
import { forResponse } from '../../e2e-test.utils'

const categoryRoute = (route: string): string => `/categories${route}`

let RESOLVE_APP

describe('Category Controller (e2e)', () => {
	let app: INestApplication

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
		RESOLVE_APP(app)
	})

	describe('/ (GET) — finding all', () => {
		it('should return all categories', () => {
			const httpServer = app.getHttpServer()
			return request(httpServer)
				.get(categoryRoute('/'))
				.expect((response) => {
					forResponse(response).statusShouldBe(200).and.bodyIsANonEmptyArray()
				})
		})
	})
})
