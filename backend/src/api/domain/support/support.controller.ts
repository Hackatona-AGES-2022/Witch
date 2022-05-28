import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthUserRequest } from '../../../@types/request'
import { ClientLocalGuard } from '../../../auth/guards/client/client-local.guard'
import { User } from '../../../db/models/user.model'
import { CreateSupportDto } from './dto/support.dto'
import { SupportService } from './support.service'

@Controller('support')
export class SupportController {
	constructor(private service: SupportService) {}

	@Post()
	@UseGuards(ClientLocalGuard)
	public async register(
		@Body(new ValidationPipe()) post: CreateSupportDto,
		@Request() req: AuthUserRequest<User>
	): Promise<void> {
		post.idUser = req.user.data.idUser
		await this.service.create(post)
	}
}
