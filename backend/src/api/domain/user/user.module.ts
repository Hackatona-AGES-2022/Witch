import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { KnexModule } from '../../../knex'
import { UtilsModule } from '../../../utils/utils.module'
import { CpfService } from '../../integration/cpf.service'
import { AddressModule } from '../address/address.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [KnexModule, UtilsModule, AddressModule, HttpModule],
	controllers: [UserController],
	providers: [UserService, CpfService],
	exports: [UserService],
})
export class UserModule {}
