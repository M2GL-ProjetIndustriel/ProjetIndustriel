import { Component, Input } from '@angular/core'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	@Input() sidenav
	sidenavToggleIcon: string = 'arrow_forward'

	toggle () {
		this.sidenav.toggle().then((value) => {
			if (value.type === 'open')
				this.sidenavToggleIcon = 'arrow_back'
			else if (value.type === 'close')
				this.sidenavToggleIcon = 'arrow_forward'
		})
	}
}
