import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CpfService {
	// essa API é paga, por isso está sendo usado o acesso de teste disponível
	private readonly accessToken = '5ae973d7a997af13f0aaf2bf60e65803'
	private readonly baseURL = 'https://api.cpfcnpj.com.br'
	private readonly scopeCode = '2'

	constructor(private http: HttpService) {}

	async getProfileFromCpf(cpf: string) {
		// por default a versão gratuita da API sempre retorna genero masculino, por isso estamos
		// criando esse caso específico. isso será removido assim que utilizar a versão pró da API
		if (cpf.endsWith('0')) {
			return Promise.resolve({ data: { genero: 'F' } })
		}

		try {
			const response = await this.http.get(`${this.baseURL}/${this.accessToken}/${this.scopeCode}/${cpf}/0`).toPromise()
			return response
		} catch (error) {
			return Promise.resolve({ data: { genero: 'M' } })
		}
	}
}
