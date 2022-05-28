import { Injectable } from '@nestjs/common'
import { Knex } from 'knex'
import { groupBy, uniq } from 'lodash'
import { Post } from '../../../db/models/post.model'
import { KnexService } from '../../../knex/knex.service'
import { BaseService } from '../../base/base.service'
import { FeedComment, FeedPost } from './dto/feed.dto'

@Injectable()
export class PostService extends BaseService<Post, number> {
	constructor(private knexService: KnexService) {
		super('idPost')
	}

	async getFeed(): Promise<FeedPost[]> {
		const posts = await this.table.where(true)
		const feedPosts: FeedPost[] = []
		for (const post of posts) {
			const author = await this.knex.table('users').where('idUser', post.idUser).first()
			const user = { name: author.name, avatar: author.avatar }
			const comments = await this.knex.table('comments').where('idPost', post.idPost)
			const idCommentAuthors = uniq(comments.map((c) => c.idUser))
			const authorUsers = await this.knex.table('users').whereIn('idUser', idCommentAuthors)
			const authorUsersGrouped = groupBy(authorUsers, (user) => user.idUser)
			const feedComments: FeedComment[] = comments.map((c) => {
				const user = authorUsersGrouped[c.idUser][0]
				return { content: c.content, user: { name: user.name, avatar: user.avatar } }
			})

			const [supportNumber] = await this.knex.table('support').where('idPost', post.idPost).count('idSupport')

			feedPosts.push({
				...post,
				comments: feedComments,
				user,
				supportNumber: supportNumber['count(`idSupport`)'],
			})
		}

		return feedPosts
	}

	private get knex(): Knex<Post> {
		return this.knexService.connect()
	}

	protected get table(): Knex.QueryBuilder<Post> {
		return this.knex.table('post')
	}
}
