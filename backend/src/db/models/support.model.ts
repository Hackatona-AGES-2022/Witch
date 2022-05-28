export interface Support {
	idSupport: number
	idPost: number
	idUser: number
}

export type SupportCreate = Omit<Support, 'idSupport'>
