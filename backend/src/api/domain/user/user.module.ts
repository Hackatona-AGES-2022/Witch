import { Module } from '@nestjs/common'
import { KnexModule } from '../../../knex'
import { UtilsModule } from '../../../utils/utils.module'
import { AddressModule } from '../address/address.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [KnexModule, UtilsModule, AddressModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
