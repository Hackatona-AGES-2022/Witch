export interface Category {
	idCategory: number
	name: string
	idSuperCategory?: number
	createdAt: Date
}

export type CategoryCreate = Omit<Category, 'idCategory' | 'createdAt'>
