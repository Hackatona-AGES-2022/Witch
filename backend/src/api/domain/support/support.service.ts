import { Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { Support } from '../../../db/models/support.model'
import { KnexService } from '../../../knex/knex.service'
import { BaseService } from '../../base/base.service'

@Injectable()
export class SupportService extends BaseService<Support, number> {
	constructor(private knexService: KnexService) {
		super('idSupport')
	}

	protected get table(): Knex.QueryBuilder<Support, any> {
		return this.knexService.connect().table('support')
	}
}