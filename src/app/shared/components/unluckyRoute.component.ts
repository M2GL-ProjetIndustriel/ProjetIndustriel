import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'app-unlucky-route',
	templateUrl: './unluckyRoute.component.html',
	styleUrls: ['./unluckyRoute.component.css']
})
export class UnluckyRouteComponent implements OnInit, OnDestroy {

	unluckyUrl: string = ''
	subscription: any

	constructor (private route: ActivatedRoute) {}

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

	ngOnDestroy () {
		this.subscription.unsubscribe()
	}

	setRoute (data: any) {
		this.unluckyUrl = ''
		for (let i in data)
			this.unluckyUrl += ('/' + data[i].path)
	}
}
