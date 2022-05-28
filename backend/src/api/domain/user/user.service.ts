import { BadRequestException, Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { Profile } from 'passport-facebook-token'
import { Address } from '../../../db/models/address.model'
import { User, UserCreate } from '../../../db/models/user.model'
import { KnexService } from '../../../knex/knex.service'
import { Encryptor } from '../../../utils/encryptor/password.encryptor'
import { BaseService } from '../../base/base.service'
import { AddressService } from '../address/address.service'
import { ProfileDto } from './dto/profile.dto'

@Injectable()
export class UserService extends BaseService<User, number> {
	constructor(
		private readonly knexService: KnexService,
		private readonly encryptor: Encryptor,
		private readonly addressService: AddressService
	) {
		super('idUser')
	}

	async profileById(idUser: number): Promise<ProfileDto> {
		const user = await this.findById(idUser)
		const addresses = await this.addressService.byUserId(idUser)
		// TODO: fetch payment methods
		return { ...user, addresses }
	}

	async myAddresses(idUser: number): Promise<Address[]> {
		return this.addressService.byUserId(idUser)
	}

	findByEmailAndPassword(username: string, password: string): Promise<User> {
		return this.table.where({ email: username, password }).first()
	}

	findByEmail(username: string): Promise<User> {
		return this.table.where({ email: username }).first()
	}

	async facebookSignIn(profile: Profile): Promise<User> {
		const user = await this.table.where({ idFacebook: profile.id }).first()
		if (user) {
			return user
		}
		const newUser: UserCreate = {
			email: profile.emails[0].value,
			name: `${profile.name.givenName} ${profile.name.familyName}`,
			password: profile.emails[0].value + profile.id,
			idFacebook: profile.id,
		}

		const id = await this.register(newUser)
		return this.findById(id)
	}

	async register(user: UserCreate): Promise<number> {
		if (await this.existsByEmail(user.email)) {
			throw new BadRequestException('E-mail já cadastrado')
		}
		const encryptedPassword = this.encryptor.encrypt(user.password)
		const model: UserCreate = {
			email: user.email,
			name: user.name,
			password: encryptedPassword,
			dateBirth: new Date(user.dateBirth),
			idFacebook: user.idFacebook,
			idGoogle: user.idGoogle,
		}
		const [id] = (await super.create(model)) as number[]
		return id
	}

	private async existsByEmail(email: string): Promise<boolean> {
		return this.table.whereExists(this.table.where('email', email)).first()
	}

	protected get table(): Knex.QueryBuilder<User> {
		return this.knexService.connect().table('users')
	}
}
