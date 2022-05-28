import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { Encryptor } from './encryptor/password.encryptor'
import { GeolocationLocator } from './locator/geolocation.locator'
import { GoogleMapsMiddleware } from './middleware/google-maps.middleware'

@Module({
	imports: [HttpModule],
	providers: [Encryptor, GeolocationLocator, GoogleMapsMiddleware],
	exports: [Encryptor, GeolocationLocator, GoogleMapsMiddleware],
})
export class UtilsModule {}
