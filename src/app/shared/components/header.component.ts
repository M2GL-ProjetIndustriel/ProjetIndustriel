import { Component, Input } from '@angular/core'

/**
 * Header component, the header of the app composed of some buttons and a
 * search bar.
 */
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	/**
	 * Reference to the sidebar of the app {@link SidenavComponent}.
	 */
	@Input() sidenav
	/**
	 * Name of the icon of the toggle button.
	 */
	sidenavToggleIcon: string = 'arrow_back'

	/**
	 * Toggle the display of the sidebar and change the icon to match the state
	 * of the sidebar (opened or closed). By default the sidebar is open.
	 */
	toggle () {
		this.sidenav.toggle().then((value) => {
			if (value.type === 'open')
				this.sidenavToggleIcon = 'arrow_back'
			else if (value.type === 'close')
				this.sidenavToggleIcon = 'arrow_forward'
		})
	}
}
