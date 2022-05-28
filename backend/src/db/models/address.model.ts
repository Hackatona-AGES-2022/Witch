export interface Address {
	idAddress: number
	state: string
	cep: string
	street: string
	number: number
	city: string
	description: string
	latitude: number
	longitude: number
	idUser?: number
	placeId: string
	formattedAddress: string
	createdAt?: Date
}

export type AddressCreate = Omit<Address, 'idAddress' | 'createdAt'>
