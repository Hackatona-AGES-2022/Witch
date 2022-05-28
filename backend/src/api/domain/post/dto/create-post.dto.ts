import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { PostCreate } from '../../../../db/models/post.model'

export class CreatePostDto implements PostCreate {
	idUser: number

	@IsString()
	@IsNotEmpty()
	content: string

	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	triggerWarning?: string
}
