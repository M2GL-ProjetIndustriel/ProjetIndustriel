import { Component, ViewChild } from '@angular/core'
import { Router, NavigationStart, NavigationEnd } from '@angular/router'

/**
 * Sidenav component, the sidebar of the app, this is the main component of the
 * app everything is inside this component, like the sidebar but alse the main
 * container containing the router-outlet.
 */
@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
	/**
	 * Items of the sidebar menu, each item is composed of a label, an icon and
	 * a router link.
	 */
	items = [
		{
			'label': 'Accueil',
			'icon': 'home',
			'routerLink': 'home'
		},
		{
			'label': 'Experimentations',
			'icon': 'list',
			'routerLink': 'experiment'
		},
		{
			'label': 'Instances',
			'icon': 'list',
			'routerLink': 'instance'
		},
		{
			'label': 'Solveurs',
			'icon': 'list',
			'routerLink': 'solver'
		},
		{
			'label': 'Recherche avancée',
			'icon': 'search',
			'routerLink': 'search'
		}
	]
	/**
	 * Reference to the sidenav component.
	 */
	@ViewChild('sidenav') sidenav: any

	private isOnLoginScreen: boolean = false

	/**
	 * Constructor, subscribe to events change on the router and hide the
	 * sidenav if the route is '/login'.
	 * @param router Router injection.
	 */
	constructor(private router: Router) {
		router.events.subscribe(
			event => {
				if (event instanceof NavigationStart && event.url.startsWith('/login')) {
					this.isOnLoginScreen = true
					if (this.sidenav.opened)
						this.sidenav.close()
				}
				else if (event instanceof NavigationStart && this.isOnLoginScreen) {
					this.sidenav.open()
					this.isOnLoginScreen = false
				}
			}
		)
	}
}
