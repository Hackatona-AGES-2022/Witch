import { Address } from './src/db/models/address.model'
import { Category } from './src/db/models/category.model'
import { PostCategory } from './src/db/models/post-category.model'
import { Post } from './src/db/models/post.model'
import { SavedPost } from './src/db/models/saved-posts.model'
import { Support } from './src/db/models/support.model'
import { User } from './src/db/models/user.model'

declare module 'knex/types/tables' {
	interface Tables {
		categories: Category
		addresses: Address
		users: User
		post: Post
		post_category: PostCategory
		comments: Comment
		support: Support
		saved_posts: SavedPost
	}
}
