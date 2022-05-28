import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import '../index'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule, { cors: Boolean(process.env.DEVELOPMENT_MODE) })
	await app.listen(process.env.PORT || 3000)
}
bootstrap()
