import { Injectable, Logger } from '@nestjs/common'
import * as passport from 'passport'
import * as PassportFacebookToken from 'passport-facebook-token'
import { Profile } from 'passport-facebook-token'
import { UserService } from '../../../api/domain/user/user.service'

export const FACEBOOK_STRATEGY_NAME = 'facebook-token'

@Injectable()
export class FacebookStrategy {
	constructor(private readonly userService: UserService, private logger: Logger) {
		// TODO: descomentar quando tiver variável de ambiente
		// this.init()
	}

	init(): void {
		passport.use(
			new PassportFacebookToken(
				{
					clientID: process.env.FACEBOOK_APP_ID,
					clientSecret: process.env.FACEBOOK_APP_SECRET,
					fbGraphVersion: 'v3.0',
				},
				async (accessToken: string, refreshToken: string, profile: Profile, done: (_, __) => void) => {
					const user = await this.userService.facebookSignIn(profile)
					return done(null, user)
				}
			)
		)
	}
}
