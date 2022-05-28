import { Body, Controller, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthUserRequest } from '../../../@types/request'
import { ClientLocalGuard } from '../../../auth/guards/client/client-local.guard'
import { User } from '../../../db/models/user.model'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/comment.dto'

@Controller('comments')
export class CommentController {
	constructor(private service: CommentService) {}

	@Post()
	@UseGuards(ClientLocalGuard)
	public async register(
		@Body(new ValidationPipe()) comment: CreateCommentDto,
		@Request() req: AuthUserRequest<User>
	): Promise<void> {
		comment.idUser = req.user.data.idUser
		await this.service.create(comment)
	}
}
