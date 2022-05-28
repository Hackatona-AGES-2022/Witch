import { IsInt, IsNotEmpty, IsNumberString, IsString } from 'class-validator'
import { AddressCreate } from '../../../../db/models/address.model'

export class CreateAddressDto implements AddressCreate {
	@IsString()
	@IsNotEmpty()
	state: string

	@IsNumberString()
	@IsNotEmpty()
	cep: string

	@IsString()
	@IsNotEmpty()
	street: string

	@IsInt()
	@IsNotEmpty()
	number: number

	@IsString()
	@IsNotEmpty()
	description: string

	@IsString()
	@IsNotEmpty()
	city: string

	latitude: number
	longitude: number
	placeId: string
	formattedAddress: string
}
