import { LatLon } from '../../@types/geolocation'

export namespace LocationBuilder {
	export function build(latitude: string, longitude: string): LatLon {
		return { latitude: +latitude, longitude: +longitude }
	}
}
