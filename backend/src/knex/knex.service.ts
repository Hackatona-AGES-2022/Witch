import { Inject, Injectable } from '@nestjs/common'
import knex, { Knex } from 'knex'
import { KnexConfig } from './knex-config'

@Injectable()
export class KnexService {
	private connection: Knex

	constructor(@Inject(KnexConfig) private readonly options: KnexConfig) {}

	connect(): Knex {
		if (!this.connection) {
			this.connection = knex(this.options)
		}
		return this.connection
	}
}
