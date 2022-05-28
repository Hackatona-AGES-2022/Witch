export interface PostCategory {
	idPostCategory: number
	idPost: number
	idCategory: number
}

export type PostCategoryCreate = Omit<PostCategory, 'idPostCategory'>
