import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Comment } from '../../../../db/models/comment.model'

export class CreateCommentDto implements Comment {
	idComment: number
	idPost: number

	idUser: number

	@IsString()
	@IsNotEmpty()
	content: string
}
