import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { AuthenticationService } from '../authentication.service'

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup

	private returnUrl: string

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private authService: AuthenticationService
	) {
		this.createForm()
	}

	createForm() {
		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.maxLength(100)]],
			password: ['', [Validators.required, Validators.maxLength(100)]]
		})
	}

	ngOnInit() {
		this.authService.logout()

		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
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
			data => {
				console.log(data)
				this.router.navigate([this.returnUrl])
			},
			err => { throw err }
		)
	}
}
