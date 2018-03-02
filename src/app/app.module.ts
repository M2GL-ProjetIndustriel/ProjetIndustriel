/* Imports ################################################################## */
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { registerLocaleData } from '@angular/common'
import localFr from '@angular/common/locales/fr'

import { SharedModule } from './shared/shared.module'
import { ExperimentsModule } from './modules/experiments/experiments.module'
import { InstancesModule } from './modules/instances/instances.module'
import { SolversModule } from './modules/solvers/solvers.module'

import { appRouting } from './app.routes'

/* Declarations ############################################################# */
import { AppComponent } from './app.component'

/* Providers ################################################################ */
import { GlobalErrorHandler } from './error-handler'

//Register fr-FR local
registerLocaleData(localFr)

/**
 * Bootstraper module.
 */
@NgModule({
	imports: [
		BrowserModule,
		SharedModule,
		ExperimentsModule,
		InstancesModule,
		SolversModule,
		appRouting
	],
	declarations: [
		AppComponent
	],
	providers: [
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler
		},
		{ provide: LOCALE_ID, useFactory: () => "fr-FR" }
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
