import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthUser } from '../../../@types/auth-user'
import { User } from '../../../db/models/user.model'
import { ClientAuthService } from '../../services/client-auth.service'

export const CLIENT_LOCAL_STRATEGY_NAME = 'client-local'

@Injectable()
export class ClientLocalStrategy extends PassportStrategy(Strategy, CLIENT_LOCAL_STRATEGY_NAME) {
	constructor(private clientAuthService: ClientAuthService) {
		super({
			usernameField: 'email',
			passportField: 'password',
		})
	}

	async validate(username: string, password: string): Promise<AuthUser<User>> {
		const user = await this.clientAuthService.validateUser(username, password)
		if (!user) {
			const { socialSignIn, social } = await this.clientAuthService.isSocialSignIn(username)
			if (socialSignIn) {
				throw new UnauthorizedException('E-mail registrado como login social. Rede social utilizada: ' + social)
			}
			throw new UnauthorizedException('Usuário ou Senha inválidos')
		}
		return { data: user, type: 'user' }
	}
}
