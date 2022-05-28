import { Injectable } from '@nestjs/common'
import { lastValueFrom, map } from 'rxjs'
import { LatLon } from '../../@types/geolocation.d'
import { GoogleMapsMiddleware } from '../middleware/google-maps.middleware'

@Injectable()
export class GeolocationLocator {
	constructor(private readonly mapsMiddleware: GoogleMapsMiddleware) {}

	loadLatitudeAndLongitude(formattedAddress: string): Promise<LatLon> {
		const resultObservable = this.mapsMiddleware.getGeocodeInfo(formattedAddress).pipe(
			map((response) => {
				const geocode = response?.results?.shift()
				if (!geocode) throw new Error('Error with google maps response for address ' + formattedAddress)
				return { latitude: geocode.geometry.location.lat, longitude: geocode.geometry.location.lng }
			})
		)
		return lastValueFrom(resultObservable)
	}
}
