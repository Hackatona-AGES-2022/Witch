import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { GoogleGeocodeResponse } from '../../@types/google-maps'

@Injectable()
export class GoogleMapsMiddleware {
	private readonly googleBaseURL = 'https://maps.googleapis.com/maps/api/geocode/json'
	constructor(private httpService: HttpService) {}

	public getGeocodeInfo(address: string): Observable<GoogleGeocodeResponse> {
		const { GOOGLE_API_KEY } = process.env
		return this.httpService
			.get<GoogleGeocodeResponse>(this.googleBaseURL, {
				params: { address, key: GOOGLE_API_KEY },
			})
			.pipe(map((res) => res.data))
	}
}
