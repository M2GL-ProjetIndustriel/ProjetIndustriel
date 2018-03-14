import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AppAuthenticationService } from '../app-authentication.service'

@Component({
	selector: 'app-login',
	templateUrl: './app-login.component.html',
	styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent {

	loginForm: FormGroup

	constructor(
		private formBuilder: FormBuilder,
		private authService: AppAuthenticationService
	) {
		this.createForm()
	}

	createForm() {
		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.maxLength(100)]],
			password: ['', [Validators.required, Validators.maxLength(100)]]
		})
	}

	onSubmit() {
		if (this.loginForm.valid)
			this.login()
	}

	login() {
		this.authService.login(
			this.loginForm.value.username,
			this.loginForm.value.password
		).subscribe(
			data => console.log(data)
		)
	}
}
