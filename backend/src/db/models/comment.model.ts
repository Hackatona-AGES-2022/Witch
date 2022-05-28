export interface Comment {
	idComment: number
	idPost: number
	idUser: number
	content: string
}

export type CommentCreate = Omit<Comment, 'idComment'>
