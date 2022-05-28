import { Injectable } from '@nestjs/common'
import { SHA256 } from 'crypto-js'

@Injectable()
export class Encryptor {
	encrypt(password: string): string {
		return SHA256(password).toString()
	}
}
