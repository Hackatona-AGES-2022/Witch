import { INestApplication } from '@nestjs/common'
import { Response } from 'superagent'
import * as request from 'supertest'

export interface TestE2EUtils {
	statusShouldBe: (status: number) => TestE2EUtils
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	bodyShouldContain: (subObject: Record<string, any>) => TestE2EUtils
	bodyMessageShouldIncludeText: (text: string) => TestE2EUtils
	bodyPropertiesShouldBeDefined: (properties: string[]) => TestE2EUtils
	bodyIsANonEmptyArray: () => TestE2EUtils
	and: TestE2EUtils
}

function statusShouldBe(response: Response, status: number): TestE2EUtils {
	expect(response.status).toEqual(status)
	return this
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function bodyShouldContain(response: Response, subObject: Record<string, any>): TestE2EUtils {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const checkEntry = (obj: Record<string, any>): boolean =>
		Object.entries(subObject).every(([key, value]) => obj[key] === value)

	if (Array.isArray(response.body)) {
		expect(response.body.some((data) => checkEntry(data))).toBe(true)
		return this
	}

	Object.entries(subObject).forEach(([key, value]) => {
		expect(response.body[key]).toEqual(value)
	})
	return this
}

function bodyPropertiesShouldBeDefined(response: Response, properties: string[]): TestE2EUtils {
	properties.forEach((property) => {
		expect(response.body[property]).toBeDefined()
	})
	return this
}

function bodyIsANonEmptyArray(response: Response): TestE2EUtils {
	expect(response.body.length).toBeGreaterThan(0)
	return this
}

function bodyMessageShouldIncludeText(response: Response, text: string): TestE2EUtils {
	expect(response.body.message).toContain(text)
	return this
}

export function forResponse(response: Response): TestE2EUtils {
	const result = {} as TestE2EUtils
	result.statusShouldBe = statusShouldBe.bind(result, response)
	result.bodyShouldContain = bodyShouldContain.bind(result, response)
	result.and = result
	result.bodyMessageShouldIncludeText = bodyMessageShouldIncludeText.bind(result, response)
	result.bodyPropertiesShouldBeDefined = bodyPropertiesShouldBeDefined.bind(result, response)
	result.bodyIsANonEmptyArray = bodyIsANonEmptyArray.bind(result, response)
	return result
}

export function authenticateDefaultUser(
	appPromise: Promise<INestApplication>,
	callback: (token: string) => void
): (done: jest.DoneCallback) => void {
	return function (done: jest.DoneCallback): void {
		appPromise.then((app) => {
			const defaultUser = { email: 'someuser@email.com', password: 'abc123' }
			request(app.getHttpServer())
				.post('/auth/login')
				.send(defaultUser)
				.expect(200)
				.end((err, response) => {
					callback(response.body.accessToken)
					done()
				})
		})
	}
}
