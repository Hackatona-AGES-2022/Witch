import { SupportService } from './support.service'
import { Module } from '@nestjs/common'
import { SupportController } from './support.controller'
import { KnexModule } from '../../../knex'

@Module({
	imports: [KnexModule],
	controllers: [SupportController],
	providers: [SupportService],
})
export class SupportModule {}
