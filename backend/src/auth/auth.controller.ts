import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JWTResponse } from '../@types/jwt'
import { AuthUserRequest } from '../@types/request'
import { User } from '../db/models/user.model'
import { ClientJwtAuthGuard } from './guards/client/client-jwt.guard'
import { ClientLocalGuard } from './guards/client/client-local.guard'
import { ClientAuthService } from './services/client-auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly clientAuthService: ClientAuthService) {}

	@UseGuards(ClientLocalGuard)
	@Post('login')
	async loginClient(@Request() req: AuthUserRequest<User>): Promise<JWTResponse> {
		return this.clientAuthService.login(req.user.data)
	}

	@UseGuards(AuthGuard('facebook-token'))
	@Get('facebook/login')
	async getTokenAfterFacebookSignIn(@Request() req: AuthUserRequest<User>): Promise<JWTResponse> {
		return this.clientAuthService.login(req.user.data)
	}

	@UseGuards(ClientJwtAuthGuard)
	@Get('health')
	async clientHealth(): Promise<boolean> {
		return true
	}
}
