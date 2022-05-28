import { Test, TestingModule } from '@nestjs/testing'
import { AuthUser } from '../../../@types/auth-user'
import { AddressCreate } from '../../../db/models/address.model'
import { User } from '../../../db/models/user.model'
import { KnexService } from '../../../knex/knex.service'
import { KnexServiceStub } from '../../../knex/knex.service.stub'
import { GeolocationLocator } from '../../../utils/locator/geolocation.locator'
import { GeolocationLocatorStub } from '../../../utils/locator/geolocation.locator.stub'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'

describe('AddressService', () => {
	let service: AddressService
	let knexService: KnexServiceStub
	let geolocationLocator: GeolocationLocatorStub

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AddressService,
				{ provide: KnexService, useClass: KnexServiceStub },
				{ provide: GeolocationLocator, useClass: GeolocationLocatorStub },
			],
		}).compile()

		service = module.get<AddressService>(AddressService)
		knexService = module.get<KnexServiceStub>(KnexService as never)
		geolocationLocator = module.get<GeolocationLocatorStub>(GeolocationLocator as never)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})

	it('should create an address', async () => {
		const dto: CreateAddressDto = {
			cep: '93290390',
			description: 'Casa',
			number: 397,
			state: 'RS',
			street: 'Veiga Marques',
			city: 'Esteio',
			formattedAddress: 'Rua Veiga Marques, 397',
			placeId: 'some id',
			latitude: 1,
			longitude: 2,
		}

		const owner = { data: { email: 'abc@123.com', idUser: 1 } } as AuthUser<User>

		const model: AddressCreate = {
			...dto,
			latitude: 1,
			longitude: 2,
			idUser: 1,
		}

		await service.create(dto, owner)

		expect(knexService.connect).toHaveBeenCalled()
		expect(knexService.knex.insert).toHaveBeenCalledWith(model)
	})

	it('should call geolocator', async () => {
		const dto: CreateAddressDto = {
			cep: '93290390',
			description: 'Casa',
			number: 397,
			state: 'RS',
			street: 'Veiga Marques',
			city: 'Esteio',
			formattedAddress: 'Rua Veiga Marques, 397',
			placeId: 'some id',
			latitude: 0,
			longitude: 0,
		}

		const owner = { data: { email: 'abc@123.com', idUser: 1 } } as AuthUser<User>

		const model: AddressCreate = {
			...dto,
			latitude: 0,
			longitude: 0,
			idUser: 1,
		}

		await service.create(dto, owner)

		expect(knexService.connect).toHaveBeenCalled()
		expect(knexService.knex.insert).toHaveBeenCalledWith(model)
		expect(geolocationLocator.loadLatitudeAndLongitude).toHaveBeenCalledWith(dto.formattedAddress)
	})
})
