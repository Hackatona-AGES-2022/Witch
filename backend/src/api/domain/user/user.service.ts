import { BadRequestException, Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { Address } from '../../../db/models/address.model'
import { User, UserCreate } from '../../../db/models/user.model'
import { KnexService } from '../../../knex/knex.service'
import { Encryptor } from '../../../utils/encryptor/password.encryptor'
import { GenderValidator } from '../../../validation/gender.validator'
import { BaseService } from '../../base/base.service'
import { CpfService } from '../../integration/cpf.service'
import { AddressService } from '../address/address.service'
import { ProfileDto } from './dto/profile.dto'

@Injectable()
export class UserService extends BaseService<User, number> {
	constructor(
		private readonly knexService: KnexService,
		private readonly encryptor: Encryptor,
		private readonly addressService: AddressService,
		private readonly cpfService: CpfService
	) {
		super('idUser')
	}

	async profileById(idUser: number): Promise<ProfileDto> {
		const user = await this.findById(idUser)
		return { idUser: user.idUser, name: user.name, username: user.username, avatar: user.avatar }
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

	async register(user: UserCreate): Promise<number> {
		await this.validateCreation(user)
		const encryptedPassword = this.encryptor.encrypt(user.password)
		const model: UserCreate = {
			email: user.email,
			name: user.name,
			password: encryptedPassword,
			dateBirth: new Date(user.dateBirth),
			idFacebook: user.idFacebook,
			idGoogle: user.idGoogle,
			cpf: user.cpf,
			username: user.username,
			avatar: user.avatar ?? `https://ui-avatars.com/api/?name=${user.name}`,
		}
		const [id] = (await super.create(model)) as number[]
		return id
	}

	private async validateCreation(user: UserCreate): Promise<void> {
		if ((await this.existsByEmail(user.email)) || (await this.existsByCPF(user.cpf))) {
			throw new BadRequestException('Usuário já cadastrado')
		}

		if (await this.existsByUsername(user.username)) {
			throw new BadRequestException('Nome de usuário em uso')
		}

		const profile = await this.cpfService.getProfileFromCpf(user.cpf)
		if (!GenderValidator.isFemale(profile.data)) {
			throw new BadRequestException('Esta aplicação é restrita para mulheres')
		}
	}

	private async existsByEmail(email: string): Promise<boolean> {
		return this.table.whereExists(this.table.where('email', email)).first()
	}

	private async existsByCPF(cpf: string): Promise<boolean> {
		return this.table.whereExists(this.table.where('cpf', cpf)).first()
	}

	private async existsByUsername(username: string): Promise<boolean> {
		return this.table.whereExists(this.table.where('username', username)).first()
	}

	protected get table(): Knex.QueryBuilder<User> {
		return this.knexService.connect().table('users')
	}
}
