import { Injectable } from '@angular/core'

@Injectable()
export class ColorService {

	private saturation: number = 0.5

	private value: number = 0.95

	getRandomColor(): string {
		let hsv = this.generateHSVColor()
		let rgb = this.HSVtoRGB(hsv.h)
		return this.RGBtoHEX(rgb.r, rgb.g, rgb.b)
	}

	private generateHSVColor() {
		return {
			h: this.generateRandomInteger(360),
			s: this.saturation,
			v: this.value
		}
	}

	/**
	 * https://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
	 * @param  h Color hue
	 * @param  s Color saturation
	 * @param  v Color value
	 * @return   An rgb color.
	 */
	private HSVtoRGB(h: number, s: number = this.saturation, v: number = this.value) {
		let r, g, b, i, f, p, q, t

		h /= 60
		i = Math.floor(h)
		f = h - i
		p = v * (1 - s)
		q = v * (1 - f * s)
		t = v * (1 - (1 - f) * s)

		switch(i) {
			case 0: r = v, g = t, b = p; break
			case 1: r = q, g = v, b = p; break
			case 2: r = p, g = v, b = t; break
			case 3: r = p, g = q, b = v; break
			case 4: r = t, g = p, b = v; break
			case 5: r = v, g = p, b = q; break
		}

		return {
			r: Math.round(r * 255),
			g: Math.round(g * 255),
			b: Math.round(b * 255)
		}
	}

	private RGBtoHEX(r: number, g: number, b: number): string {
		return '#' + this.integerToHex(r) + this.integerToHex(g) + this.integerToHex(b)
	}

	private integerToHex(i: number): string {
		let hex = i.toString(16)
		return hex.length == 1 ? '0' + hex : hex
	}

	private generateRandomInteger(max: number): number {
		return Math.floor(Math.random() * max)
	}
}
