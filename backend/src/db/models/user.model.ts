export interface User {
	idUser: number
	name: string
	username: string
	avatar?: string
	cpf: string
	email: string
	password: string
	dateBirth?: Date
	idFacebook?: string
	idGoogle?: string
	createdAt: Date
}

export type UserCreate = Omit<User, 'idUser' | 'createdAt'>
