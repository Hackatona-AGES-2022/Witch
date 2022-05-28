import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthUser } from '../../../@types/auth-user'
import { JWTPayload } from '../../../@types/jwt'
import { UserService } from '../../../api/domain/user/user.service'
import { JWT_CONFIG } from '../../../constants/jwt.constant'
import { User } from '../../../db/models/user.model'

export const CLIENT_JWT_STRATEGY_NAME = 'client-jwt'

@Injectable()
export class ClientJwtStrategy extends PassportStrategy(Strategy, CLIENT_JWT_STRATEGY_NAME) {
	constructor(private readonly clientService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT_CONFIG.secret,
		})
	}

	async validate(payload: JWTPayload): Promise<AuthUser<User>> {
		if (!payload.sub) this.throwInvalidTokenException()
		const user = await this.clientService.findById(payload.sub)
		if (!user || user.email !== payload.username) this.throwInvalidTokenException()
		return { data: user, type: 'user' }
	}

	private throwInvalidTokenException(): void {
		throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
	}
}
