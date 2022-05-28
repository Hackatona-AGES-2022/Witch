import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { KnexModule } from '../knex'
import { UtilsModule } from '../utils/utils.module'
import { AddressModule } from './domain/address/address.module'
import { CategoryModule } from './domain/category/category.module'
import { PostModule } from './domain/post/post.module'
import { UserModule } from './domain/user/user.module'

@Module({
	imports: [UtilsModule, CategoryModule, AuthModule, KnexModule, AddressModule, UserModule, PostModule],
	controllers: [],
	providers: [],
})
export class ApiModule {}
