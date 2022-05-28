import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JWTResponse } from '../../@types/jwt'
import { UserService } from '../../api/domain/user/user.service'
import { User } from '../../db/models/user.model'
import { Encryptor } from '../../utils/encryptor/password.encryptor'

@Injectable()
export class ClientAuthService {
	constructor(
		private readonly userService: UserService,
		private jwtService: JwtService,
		private readonly passwordEncryptor: Encryptor
	) {}

	validateUser(username: string, password: string): Promise<User> {
		const encryptedPassword = this.passwordEncryptor.encrypt(password)
		const user = this.userService.findByEmailAndPassword(username, encryptedPassword)
		if (!user) {
			throw new UnauthorizedException()
		}
		return user
	}

	async isSocialSignIn(username: string): Promise<{ socialSignIn: boolean; social?: string }> {
		const user = await this.userService.findByEmail(username)
		if (!user) {
			return { socialSignIn: false }
		}

		const isFacebook = Boolean(user.idFacebook)
		const isGoogle = Boolean(user.idGoogle)
		return { socialSignIn: isFacebook || isGoogle, social: isFacebook ? 'Facebook' : isGoogle ? 'Google' : undefined }
	}

	async login(user: User): Promise<JWTResponse> {
		const payload = { username: user.email, sub: user.idUser }
		return {
			accessToken: this.jwtService.sign(payload),
		}
	}
}
