import { Body, Controller, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthUserRequest } from '../../../@types/request'
import { ClientLocalGuard } from '../../../auth/guards/client/client-local.guard'
import { User } from '../../../db/models/user.model'
import { CreatePostDto } from './dto/create-post.dto'
import { PostService } from './post.service'

@Controller('posts')
export class PostController {
	constructor(private service: PostService) {}

	@Post()
	@UseGuards(ClientLocalGuard)
	public async register(
		@Body(new ValidationPipe()) post: CreatePostDto,
		@Request() req: AuthUserRequest<User>
	): Promise<void> {
		post.idUser = req.user.data.idUser
		await this.service.create(post)
	}
}
