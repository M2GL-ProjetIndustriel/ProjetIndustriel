/* Imports ################################################################## */
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { registerLocaleData } from '@angular/common'
import localFr from '@angular/common/locales/fr'
import {
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
} from '@angular/material'

import { SharedModule } from './shared/shared.module'
import { ExperimentsModule } from './modules/experiments/experiments.module'
import { InstancesModule } from './modules/instances/instances.module'
import { SolversModule } from './modules/solvers/solvers.module'

import { appRouting } from './app.routes'

/* Declarations ############################################################# */
import { AppComponent } from './components/app.component'
import { AppLoginComponent } from './components/app-login.component'

/* Providers ################################################################ */
import { GlobalErrorHandler } from './error-handler'
import { AppAuthenticationService } from './app-authentication.service'
import { AppAuthenticationGuard } from './app-authentication.guard'

//Register fr-FR local
registerLocaleData(localFr)

/**
 * Bootstraper module.
 */
@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		SharedModule,
		ExperimentsModule,
		InstancesModule,
		SolversModule,
		appRouting
	],
	declarations: [
		AppComponent,
		AppLoginComponent
	],
	providers: [
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler
		},
		{ provide: LOCALE_ID, useFactory: () => "fr-FR" },
		AppAuthenticationService,
		AppAuthenticationGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	/**
	 * Constructor, does nothing other than logging the routes of the app,
	 * for debug purpose only.
	 * @param router This app router module.
	 */
	constructor(router: Router) {
		console.log('Routes: ', JSON.stringify(router.config, undefined, 2))
	}
}
