export class GeolocationLocatorStub {
	loadLatitudeAndLongitude: jest.Mock

	constructor() {
		this.loadLatitudeAndLongitude = jest.fn().mockResolvedValue({ latitude: 0, longitude: 0 })
	}
}
