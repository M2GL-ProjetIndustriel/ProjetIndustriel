import { Component, Input, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations'

/**
 * Header component, the header of the app composed of some buttons and a
 * search bar.
 */
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	animations: [
		trigger('searchInputAnimation', [
			state('notFocused', style({
				width: '*'
			})),
			state('focused', style({
				width: '400px'
			})),
			transition('notFocused <=> focused', animate('150ms ease-in'))
		]),
		trigger('searchFormAnimation', [
			state('notFocused', style({
				border: '1px solid #F5F5F5'
			})),
			state('focused', style({
				border: '1px solid #BBB'
			}))
		])
	]
})
export class HeaderComponent implements AfterViewInit {
	/**
	 * Reference to the sidebar of the app {@link SidenavComponent}.
	 */
	@Input() sidenav
	/**
	 * Name of the icon of the toggle button.
	 */
	sidenavToggleIcon: string = 'arrow_back'
	/**
	 * Reference to the search input html element.
	 */
	@ViewChild('searchInput') searchInput: ElementRef
	/**
	 * State of out search form. Should've only 2 value "focused" or
	 * "notFocused".
	 */
	searchFormState: string = 'notFocused'

	user: any

	/**
	 * Constructor, doesn't do shit.
	 * @param renderer Renderer, used to set up native event listener on html elements.
	 */
	constructor(
		public renderer: Renderer2
	) {
		this.user = localStorage.getItem('user') || { username: null }
	}

	/**
	 * Set up events listener after view init.
	 */
	ngAfterViewInit() {
		this.renderer.listen(this.searchInput.nativeElement, 'focusin', (event) => {
			this.searchFormState = 'focused'
		})
		this.renderer.listen(this.searchInput.nativeElement, 'focusout', (event) => {
			this.searchFormState = 'notFocused'
		})
	}

	/**
	 * Toggle the display of the sidebar and change the icon to match the state
	 * of the sidebar (opened or closed). By default the sidebar is open.
	 */
	toggle() {
		this.sidenav.toggle().then((value) => {
			if (value.type === 'open')
				this.sidenavToggleIcon = 'arrow_back'
			else if (value.type === 'close')
				this.sidenavToggleIcon = 'arrow_forward'
		})
	}
}
