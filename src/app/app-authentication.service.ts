import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { retry, map } from 'rxjs/operators'

import { appConfig } from './config'

@Injectable()
export class AppAuthenticationService {

	private loggedIn: boolean = false

	constructor(private http: HttpClient) {}

	login(username: string, password: string) {
		return this.http.post(appConfig.apiUrl + '/login', { username: username, password: password })
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map((data: any) => {
					if (data.error)
						throw new Error(data.error.message)
					else if (data.data) {
						if (data.data.token) {
							localStorage.setItem('user', JSON.stringify(data.data.token))
							this.loggedIn = true
							return data
						}
					}
					else
						throw new Error('Login fail')
				})
			)
	}

	logout() {
		localStorage.removeItem('user')
		this.loggedIn = false
	}

	isLoggedIn(): boolean {
		return this.loggedIn
	}
}
