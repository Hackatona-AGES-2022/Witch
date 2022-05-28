export interface Post {
	idPost: number
	idUser: number
	content: string
	title?: string
	triggerWarning?: string
	date: Date
}

export type PostCreate = Omit<Post, 'idPost' | 'date'>
