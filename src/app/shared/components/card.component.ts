import { Component, Input } from '@angular/core'

/**
 * Card component, a purely cosmetic component.
 */
@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent {
	/**
	 * Header of the component, default value is 'null'
	 */
	@Input() header: string = 'null'
}
