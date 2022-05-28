export interface SavedPost {
	idSavedPost: number
	idPost: number
	idUser: number
}

export type SavedPostCreate = Omit<SavedPost, 'idSavedPost'>
