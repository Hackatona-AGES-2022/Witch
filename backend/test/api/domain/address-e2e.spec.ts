import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../../src/app.module'
import { CreateAddressDto } from '../../../src/api/domain/address/dto/create-address.dto'
import { authenticateDefaultUser, forResponse } from '../../e2e-test.utils'

let AUTH_HEADER: string
const addressRoute = (route: string): string => `/addresses${route}`
const setAuthToken = (token: string): void => {
	AUTH_HEADER = `Bearer ${token}`
}

let RESOLVE_APP
const APP_PROMISE: Promise<INestApplication> = new Promise((resolve) => (RESOLVE_APP = resolve))

const ADDRESS_DTO = {
	cep: '93290390',
	city: 'Esteio',
	description: 'Casa',
	number: 397,
	state: 'RS',
	street: 'Veiga Marques',
	formattedAddress: 'Rua Veiga Marques, 397',
	placeId: 'some id',
	latitude: 1,
	longitude: 2,
}

describe('Address Controller (e2e)', () => {
	let app: INestApplication

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
		RESOLVE_APP(app)
	})

	describe('/ (POST) — creating a new address', () => {
		it('should fail for unauthenticated request', () => {
			const httpServer = app.getHttpServer()
			return request(httpServer)
				.post(addressRoute('/'))
				.send(ADDRESS_DTO)
				.expect((response) => {
					forResponse(response).statusShouldBe(401).and.bodyShouldContain({ message: 'Unauthorized' })
				})
		})

		describe('as an authenticated user', () => {
			beforeAll(authenticateDefaultUser(APP_PROMISE, setAuthToken))
			it('should fail for empty cep request', () => {
				const httpServer = app.getHttpServer()
				const address: CreateAddressDto = { ...ADDRESS_DTO, cep: '' }

				return request(httpServer)
					.post(addressRoute('/'))
					.set('Authorization', AUTH_HEADER)
					.send(address)
					.expect((response) => {
						forResponse(response)
							.statusShouldBe(400)
							.and.bodyMessageShouldIncludeText('Validation failed for field(s): cep')
					})
			})

			it('should fail for non number cep request', () => {
				const httpServer = app.getHttpServer()
				const address: CreateAddressDto = { ...ADDRESS_DTO, cep: 'abc' }

				return request(httpServer)
					.post(addressRoute('/'))
					.set('Authorization', AUTH_HEADER)
					.send(address)
					.expect((response) => {
						forResponse(response)
							.statusShouldBe(400)
							.and.bodyMessageShouldIncludeText('Validation failed for field(s): cep')
					})
			})

			it('should fail for empty state request', () => {
				const httpServer = app.getHttpServer()
				const address: CreateAddressDto = { ...ADDRESS_DTO, state: '' }

				return request(httpServer)
					.post(addressRoute('/'))
					.set('Authorization', AUTH_HEADER)
					.send(address)
					.expect((response) => {
						forResponse(response)
							.statusShouldBe(400)
							.and.bodyMessageShouldIncludeText('Validation failed for field(s): state')
					})
			})

			it('should fail for empty street request', () => {
				const httpServer = app.getHttpServer()
				const address: CreateAddressDto = { ...ADDRESS_DTO, street: '' }

				return request(httpServer)
					.post(addressRoute('/'))
					.set('Authorization', AUTH_HEADER)
					.send(address)
					.expect((response) => {
						forResponse(response)
							.statusShouldBe(400)
							.and.bodyMessageShouldIncludeText('Validation failed for field(s): street')
					})
			})

			it('should fail for non int number request', () => {
				const httpServer = app.getHttpServer()
				const address: CreateAddressDto = { ...ADDRESS_DTO, number: 1.34 }

				return request(httpServer)
					.post(addressRoute('/'))
					.set('Authorization', AUTH_HEADER)
					.send(address)
					.expect((response) => {
						forResponse(response)
							.statusShouldBe(400)
							.and.bodyMessageShouldIncludeText('Validation failed for field(s): number')
					})
			})

			it('should fail for empty description request', () => {
				const httpServer = app.getHttpServer()
				const address: CreateAddressDto = { ...ADDRESS_DTO, description: '' }

				return request(httpServer)
					.post(addressRoute('/'))
					.set('Authorization', AUTH_HEADER)
					.send(address)
					.expect((response) => {
						forResponse(response)
							.statusShouldBe(400)
							.and.bodyMessageShouldIncludeText('Validation failed for field(s): description')
					})
			})

			it('should fail for empty city request', () => {
				const httpServer = app.getHttpServer()
				const address: CreateAddressDto = { ...ADDRESS_DTO, city: '' }
				return request(httpServer)
					.post(addressRoute('/'))
					.set('Authorization', AUTH_HEADER)
					.send(address)
					.expect((response) => {
						forResponse(response)
							.statusShouldBe(400)
							.and.bodyMessageShouldIncludeText('Validation failed for field(s): city')
					})
			})

			it('should create address', () => {
				const httpServer = app.getHttpServer()
				return request(httpServer)
					.post(addressRoute('/'))
					.set('Authorization', AUTH_HEADER)
					.send(ADDRESS_DTO)
					.expect((response) => {
						forResponse(response)
							.statusShouldBe(201)
							.and.bodyShouldContain(ADDRESS_DTO)
							.and.bodyPropertiesShouldBeDefined(['latitude', 'longitude', 'ownedBy'])
					})
			})
		})
	})
})
