import { Module } from '@nestjs/common'
import { KnexModule } from '../../../knex'
import { UtilsModule } from '../../../utils/utils.module'
import { AddressController } from './address.controller'
import { AddressService } from './address.service'

@Module({
	imports: [KnexModule, UtilsModule],
	controllers: [AddressController],
	providers: [AddressService],
	exports: [AddressService],
})
export class AddressModule {}
