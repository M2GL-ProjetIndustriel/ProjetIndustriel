/* Imports ################################################################## */
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import {
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
} from '@angular/material'

/* Declarations ############################################################# */
import { LoginComponent } from './components/login.component'

/* Providers ################################################################ */
import { AuthenticationService } from './authentication.service'
import { AuthenticationGuard } from './authentication.guard'

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule
	],
	declarations: [
		LoginComponent
	],
	providers: [
		AuthenticationService,
		AuthenticationGuard
	]
})
export class AuthenticationModule {}
