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
			'icon': 'add'
		},
		{
			'label': 'Instances',
			'icon': 'add'
		},
		{
			'label': 'Résultats',
			'icon': 'add'
		},
		{
			'label': 'Solveurs',
			'icon': 'add'
		},
		{
			'label': 'Recherche avancée',
			'icon': 'search'
		}
	]
}
