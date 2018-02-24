import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

/**
 * Component that is displayed when an unknown route is reached.
 */
@Component({
	selector: 'app-unlucky-route',
	templateUrl: './unluckyRoute.component.html',
	styleUrls: ['./unluckyRoute.component.css']
})
export class UnluckyRouteComponent implements OnInit, OnDestroy {
	/**
	 * Url of the fucked up route.
	 */
	unluckyUrl: string = ''
	/**
	 * Subscription to an Obersvable.
	 */
	subscription: any

	/**
	 * Constructor, doesn't do shit.
	 * @param route ActivatedRoute module needed to do some shit with the app
	 * route.
	 */
	constructor (private route: ActivatedRoute) { }

	/**
	 * On init subscribe to the changes in the route url.
	 */
	ngOnInit () {
		this.subscription = this.route.url.subscribe(
			data => {
				this.setRoute(data)
			},
			err => {
				console.log(err)
			}
		)
	}

	/**
	 * On destroy unsubscribe to prevent memory leaks.
	 */
	ngOnDestroy () {
		this.subscription.unsubscribe()
	}

	/**
	 * Callback of the url change subcription. Set the url of this component
	 * to the new url of the app.
	 * @param  data Some data to process.
	 */
	setRoute (data: any) {
		this.unluckyUrl = ''
		for (let i in data)
			this.unluckyUrl += ('/' + data[i].path)
	}
}
