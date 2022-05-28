export interface User {
	idUser: number
	name: string
	email: string
	password: string
	dateBirth?: Date
	idFacebook?: string
	idGoogle?: string
	createdAt: Date
}

export type UserCreate = Omit<User, 'idUser' | 'createdAt'>
