import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { retry, map } from 'rxjs/operators'

import { appConfig } from '../../config'

//TODO: oninit check localStorage for previous token && user access level guard

@Injectable()
export class AuthenticationService {

	private loggedIn: boolean = false

	private user: BehaviorSubject<any> = new BehaviorSubject<any>(null)

	constructor(private http: HttpClient) {}

	login(username: string, password: string) {
		return this.http.post(appConfig.apiUrl + '/token-auth', { username: username, password: password })
			.pipe(
				retry(appConfig.httpFailureRetryNumber),
				map((data: any) => {
					if (data.token) {
						let user = this.createLoggedInUser(data.token, username)
						localStorage.setItem('user', JSON.stringify(user))
						this.user.next(user)

						this.loggedIn = true

						return data
					}
					else
						throw new Error('Pas de jeton, pas de chocolat.')
				}))
	}

	logout() {
		localStorage.removeItem('user')
		this.user.next(null)
		this.loggedIn = false
	}

	isLoggedIn(): boolean {
		return this.loggedIn
	}

	getUserStream() {
		return this.user
	}

	private createLoggedInUser(token?: string, username?: string, accessLevel?: string) {
		return {
			token: token,
			username: username,
			accessLevel: 'admin'
		}
	}

	private debugLogin(username: string, password: string) {
		let user = this.createLoggedInUser('123', username)
		localStorage.setItem('user', JSON.stringify(user))
		this.user.next(user)

		this.loggedIn = true

		return new Observable(observer => {
			observer.next(user)
		})
	}
}
