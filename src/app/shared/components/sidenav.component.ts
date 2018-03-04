import { Component } from '@angular/core'

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
			'label': 'Résultats',
			'icon': 'list',
			'routerLink': 'result'
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
}
