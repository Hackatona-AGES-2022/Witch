import { Encryptor } from './password.encryptor'

describe('PasswordEncryptor', () => {
	let encryptor: Encryptor

	beforeEach(() => {
		encryptor = new Encryptor()
	})
	it('should generate a different string', () => {
		const text = 'password123'
		expect(encryptor.encrypt(text)).not.toEqual(text)
	})
	it('should generate a larger string', () => {
		const text = 'password123'
		const encrypted = encryptor.encrypt(text)
		expect(encrypted.length).toBeGreaterThan(text.length)
	})
	it('should generate the same output with same input', () => {
		const text = 'password123'
		const encryptedOne = encryptor.encrypt(text)
		const encryptedTwo = encryptor.encrypt(text)
		expect(encryptedOne).toEqual(encryptedTwo)
	})
})
