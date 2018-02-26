/* Imports ################################################################## */
import { NgModule, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Router } from '@angular/router'

import { SharedModule } from './shared/shared.module'
import { ExperimentsModule } from './modules/experiments/experiments.module'

import { appRouting } from './app.routes'

/* Declarations ############################################################# */
import { AppComponent } from './app.component'

/* Providers ################################################################ */
import { GlobalErrorHandler } from './error-handler'

/**
 * Bootstraper module.
 */
@NgModule({
	imports: [
		BrowserModule,
		ExperimentsModule,
		SharedModule,
		appRouting
	],
	declarations: [
		AppComponent
	],
	providers: [
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler
		}
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
