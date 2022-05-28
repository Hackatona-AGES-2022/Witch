import { Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { Post } from '../../../db/models/post.model'
import { KnexService } from '../../../knex/knex.service'
import { BaseService } from '../../base/base.service'

@Injectable()
export class PostService extends BaseService<Post, number> {
	constructor(private knexService: KnexService) {
		super('idPost')
	}

	protected get table(): Knex.QueryBuilder<Post, any> {
		return this.knexService.connect().table('post')
	}
}
