import { UserType } from '../constants/user.type'

export interface AuthUser<User> {
	data: User
	type: UserType
}
