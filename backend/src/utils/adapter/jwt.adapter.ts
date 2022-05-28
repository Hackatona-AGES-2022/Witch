import { ExtractJwt } from 'passport-jwt'
import { AuthUserRequest } from '../../@types/request'

export namespace JWTAdapter {
	export function extractTokenFromRequest<T>(request: AuthUserRequest<T>): string {
		return ExtractJwt.fromAuthHeaderAsBearerToken()(request)
	}

	export function extractSplittedTokenFromRequest<T>(request: AuthUserRequest<T>): string[] {
		const token = extractTokenFromRequest(request)
		return token.split('.')
	}
}
