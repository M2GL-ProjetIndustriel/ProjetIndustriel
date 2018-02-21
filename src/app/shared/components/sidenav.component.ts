import { Component } from '@angular/core'

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
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
