import { Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { AuthUser } from '../../../@types/auth-user'
import { Address, AddressCreate } from '../../../db/models/address.model'
import { User } from '../../../db/models/user.model'
import { KnexService } from '../../../knex/knex.service'
import { GeolocationLocator } from '../../../utils/locator/geolocation.locator'
import { BaseService } from '../../base/base.service'
import { CreateAddressDto } from './dto/create-address.dto'

@Injectable()
export class AddressService extends BaseService<Address, number> {
	constructor(private knexService: KnexService, private readonly geolocationLocator: GeolocationLocator) {
		super('idAddress')
	}

	async byUserId(idUser: number): Promise<Address[]> {
		return this.table.where({ idUser })
	}

	async create(dto: CreateAddressDto, owner: AuthUser<User>): Promise<Address> {
		const { fieldName, value } = this.extractUserID(owner)

		if (!dto.latitude || !dto.longitude) {
			const { latitude, longitude } = await this.geolocationLocator.loadLatitudeAndLongitude(dto.formattedAddress)
			dto.latitude = latitude
			dto.longitude = longitude
		}

		const model: AddressCreate = {
			cep: dto.cep,
			description: dto.description,
			number: dto.number,
			state: dto.state,
			street: dto.street,
			city: dto.city,
			latitude: dto.latitude,
			longitude: dto.longitude,
			formattedAddress: dto.formattedAddress,
			placeId: dto.placeId,
		}

		if (fieldName && value) {
			model[fieldName] = value
		}

		const [idAddress] = (await super.create(model)) as number[]
		return { ...model, idAddress }
	}

	private extractUserID(authUser: AuthUser<User>): { fieldName: 'idUser'; value: number } {
		return {
			fieldName: 'idUser',
			value: authUser.data.idUser,
		}
	}

	protected get table(): Knex.QueryBuilder<Address> {
		return this.knexService.connect().table('addresses')
	}
}
