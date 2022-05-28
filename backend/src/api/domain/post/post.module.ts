import { PostService } from './post.service'
import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { KnexModule } from '../../../knex'

@Module({
	imports: [KnexModule],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
