import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { SupportCreate } from '../../../../db/models/support.model'

export class CreateSupportDto implements SupportCreate {
	idPost: number
	idUser: number
}