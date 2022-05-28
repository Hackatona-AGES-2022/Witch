import { Request } from 'express'
import { AuthUser } from './auth-user'

export interface AuthUserRequest<T> extends Request {
	user: AuthUser<T>
}
