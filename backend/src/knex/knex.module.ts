import { Module } from '@nestjs/common'
import { createKnexConfig, KnexConfig } from './knex-config'
import { KnexService } from './knex.service'

@Module({
	providers: [KnexService, { provide: KnexConfig, useFactory: createKnexConfig }],
	exports: [KnexService],
})
export class KnexModule {}
