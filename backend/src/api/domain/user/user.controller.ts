import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { AuthUserRequest } from '../../../@types/request'
import { ClientJwtAuthGuard } from '../../../auth/guards/client/client-jwt.guard'
import { Address } from '../../../db/models/address.model'
import { User } from '../../../db/models/user.model'
import { ValidationPipe } from '../../../validation/validation.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { ProfileDto } from './dto/profile.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private service: UserService) {}
	@Post()
	public register(@Body(new ValidationPipe()) user: CreateUserDto): Promise<number> {
		return this.service.register(user)
	}

	@Get('/me')
	@UseGuards(ClientJwtAuthGuard)
	public profile(@Req() request: AuthUserRequest<User>): Promise<ProfileDto> {
		return this.service.profileById(request.user.data.idUser)
	}

	@Get('/me/addresses')
	@UseGuards(ClientJwtAuthGuard)
	public addresses(@Req() request: AuthUserRequest<User>): Promise<Address[]> {
		return this.service.myAddresses(request.user.data.idUser)
	}

	@Get('/:id')
	public byId(@Param('id') id: number): Promise<User> {
		return this.service.findById(id)
	}
}
