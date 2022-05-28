import { Module } from '@nestjs/common'
import { KnexModule } from '../../../knex'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
	imports: [KnexModule],
	controllers: [CategoryController],
	providers: [CategoryService],
	exports: [CategoryService],
})
export class CategoryModule {}
