import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Type } from '@nestjs/common'
import { validate, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<never> {
	async transform(value: never, { metatype }: ArgumentMetadata): Promise<unknown> {
		if (!metatype || !this.toValidate(metatype)) {
			return value
		}
		const object = plainToClass(metatype, value)
		const errors = await validate(object)
		if (errors.length > 0) {
			throw new BadRequestException(this.getExceptionString(errors))
		}
		return value
	}

	private getExceptionString(errors: ValidationError[]): string {
		const propertiesWithError = errors.map((e) => e.property)
		const problemWithFieldString = errors.filter(Boolean).map((e) => {
			if (e.constraints) return '- ' + Object.values(e.constraints).join('\n - ')

			const errs = []
			let err = e
			if (err && err.children)
				while (err && err.children) {
					if (err.constraints) errs.push('- ' + Object.values(err.constraints).join('\n - '))
					err = e.children.shift()
				}
			return errs.join('\n')
		})

		return `Validation failed for field(s): ${propertiesWithError.join(', ')}. ${problemWithFieldString.join('   ')}`
	}

	private toValidate(metatype: Type): boolean {
		const types = [String, Boolean, Number, Array, Object]
		return !types.includes(metatype as never)
	}
}
