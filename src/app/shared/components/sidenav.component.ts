import { Component } from '@angular/core'

/**
 * Sidenav component, the sidebar of the app, this is the main component of the
 * app everything is inside this component, like the sidebar but alse the main
 * container containing the router-outlet.
 */
@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
	/**
	 * Items of the sidebar menu, each item is composed of a label, an icon and
	 * a router link.
	 */
	items = [
		{
			'label': 'Experimentations',
			'icon': 'add',
			'routerLink': 'experiment'
		},
		{
			'label': 'Instances',
			'icon': 'add',
			'routerLink': 'instance'
		},
		{
			'label': 'Résultats',
			'icon': 'add',
			'routerLink': 'result'
		},
		{
			'label': 'Solveurs',
			'icon': 'add',
			'routerLink': 'solver'
		},
		{
			'label': 'Recherche avancée',
			'icon': 'search',
			'routerLink': 'search'
		}
	]
}
