export interface JWTResponse {
	accessToken: string
}

export interface JWTPayload {
	username: string
	sub: number
	iat: number
	exp: number
}
