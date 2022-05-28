import { Logger, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from '../api/domain/user/user.module'
import { JWT_CONFIG } from '../constants/jwt.constant'
import { KnexModule } from '../knex'
import { UtilsModule } from '../utils/utils.module'
import { AuthController } from './auth.controller'
import { ClientAuthService } from './services/client-auth.service'
import { ClientJwtStrategy } from './strategies/client/client-jwt.strategy'
import { ClientLocalStrategy } from './strategies/client/client-local.strategy'
import { FacebookStrategy } from './strategies/social/facebook.strategy'

@Module({
	imports: [
		UtilsModule,
		KnexModule,
		UserModule,
		JwtModule.register({
			secret: JWT_CONFIG.secret,
			signOptions: { expiresIn: '86400s' },
		}),
	],
	controllers: [AuthController],
	providers: [ClientLocalStrategy, ClientAuthService, ClientJwtStrategy, FacebookStrategy, Logger],
})
export class AuthModule {}
