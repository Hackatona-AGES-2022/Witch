import { CommentService } from './comment.service'
import { Module } from '@nestjs/common'
import { CommentController } from './comment.controller'
import { KnexModule } from '../../../knex'

@Module({
	imports: [KnexModule],
	controllers: [CommentController],
	providers: [CommentService],
})
export class CommentModule {}