import { Injectable } from '@angular/core'
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (localStorage.getItem('user')) {
			request = request.clone({
				setHeaders: {
					Authorization: `Token ${JSON.parse(localStorage.getItem('user')).token}`
				}
			})
		}

		return next.handle(request)
	}
}
