import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthUserRequest } from '../../../@types/request'
import { ClientJwtAuthGuard } from '../../../auth/guards/client/client-jwt.guard'
import { User } from '../../../db/models/user.model'
import { CreatePostDto } from './dto/create-post.dto'
import { FeedPost } from './dto/feed.dto'
import { PostService } from './post.service'

@Controller('posts')
export class PostController {
	constructor(private service: PostService) {}

	@Get('/feed')
	public getFeed(): Promise<FeedPost[]> {
		return this.service.getFeed()
	}

	@Post()
	@UseGuards(ClientJwtAuthGuard)
	public async register(
		@Body(new ValidationPipe()) post: CreatePostDto,
		@Request() req: AuthUserRequest<User>
	): Promise<void> {
		post.idUser = req.user.data.idUser
		await this.service.create(post)
	}
}
