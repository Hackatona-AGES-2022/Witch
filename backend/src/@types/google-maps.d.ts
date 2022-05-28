export interface GoogleAddressComponent {
	long_name: string
	short_name: string
	types: string[]
}

export interface GoogleLatLng {
	lat: number
	lng: number
}

export interface GoogleGeometry {
	location: GoogleLatLng
	location_type: string
	viewport: {
		northeast: GoogleLatLng
		southwest: GoogleLatLng
	}
}

export interface GoogleGeocode {
	address_components: GoogleAddressComponent[]
	formatted_address: string
	geometry: GoogleGeometry
	place_id: string
	plus_code: {
		compound_code: string
		global_code: string
	}
	types: string[]
}

export interface GoogleGeocodeResponse {
	results: GoogleGeocode[]
	status: string
}
