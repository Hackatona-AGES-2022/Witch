import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { CommentCreate } from '../../../../db/models/comment.model'

export class CreateCommentDto implements CommentCreate {
	idPost: number

	idUser: number

	@IsString()
	@IsNotEmpty()
	content: string
}
