import { Component, Input } from '@angular/core'
import { trigger, state, style, animate, transition } from '@angular/animations'

/**
 * Card component, a purely cosmetic component.
 */
@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css'],
	animations: [
		trigger('flyInOut', [
			state('in', style({ transform: 'translateX(0)' })),
			transition(':enter', [
				style({ transform: 'translateX(-100%)' }),
				animate(200)
			]),
			transition(':leave', [
				animate(200, style({ transform: 'translateX(100%)' }))
			])
		])
	]
})
export class CardComponent {
	/**
	 * Header of the component, default value is 'null'
	 */
	@Input() header: string = 'null'
}
