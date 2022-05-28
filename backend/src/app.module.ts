import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ApiModule } from './api/api.module'

@Module({
	imports: [ApiModule, ConfigModule.forRoot({ isGlobal: true })],
	controllers: [],
	providers: [],
})
export class AppModule {}
