import { Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { Comment } from '../../../db/models/comment.model'
import { KnexService } from '../../../knex/knex.service'
import { BaseService } from '../../base/base.service'

@Injectable()
export class CommentService extends BaseService<Comment, number> {
	constructor(private knexService: KnexService) {
		super('idComment')
	}

	protected get table(): Knex.QueryBuilder<Comment, any> {
		return this.knexService.connect().table('comment')
	}
}