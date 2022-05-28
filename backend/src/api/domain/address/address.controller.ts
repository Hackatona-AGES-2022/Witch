import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthUserRequest } from '../../../@types/request'
import { ClientJwtAuthGuard } from '../../../auth/guards/client/client-jwt.guard'
import { Address } from '../../../db/models/address.model'
import { User } from '../../../db/models/user.model'
import { ValidationPipe } from '../../../validation/validation.pipe'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/create-address.dto'

@Controller('addresses')
export class AddressController {
	constructor(private readonly addressService: AddressService) {}

	@Post()
	@UseGuards(ClientJwtAuthGuard)
	create(@Body(new ValidationPipe()) dto: CreateAddressDto, @Req() req: AuthUserRequest<User>): Promise<Address> {
		return this.addressService.create(dto, req.user)
	}
}
