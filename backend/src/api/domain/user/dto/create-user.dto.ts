import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { UserCreate } from '../../../../db/models/user.model'

export class CreateUserDto implements UserCreate {
	cpf: string
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsString()
	@IsNotEmpty()
	password: string

	@IsString()
	@IsOptional()
	dateBirth?: Date

	@IsString()
	@IsNotEmpty()
	username: string

	@IsString()
	@IsOptional()
	avatar?: string

	idFacebook?: string
	idGoogle?: string
}
