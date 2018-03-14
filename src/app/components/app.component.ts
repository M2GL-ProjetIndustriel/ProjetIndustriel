import { Component } from '@angular/core'

import { appConfig } from '../config'

/**
 * Bootstraper component.
 */
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	/**
	 * Reference to appConfig, see {@link appConfig}
	 */
	config: any = appConfig
}
