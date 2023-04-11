import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
	name: 'nombre'
})
export class NombrePipe implements PipeTransform {

	constructor(private currencyPipe: CurrencyPipe) {
	}

	/**
	 * Transforme une valeur en prix sous forme de chaine.
	 *
	 * @param valeur la valeur.
	 * @param nbDecimales le nombre de décimales à afficher (défaut: 2).
	 * @param afficherSymbole (optionnel) true pour afficher le symbol.
	 */
	transform(valeur: any, afficherSymbole?: boolean, nbDecimales: number = 0): string {
		let display = '';
		if (afficherSymbole) {
			display = 'symbol';
		}
		return this.currencyPipe.transform(valeur, 'EUR', display, `1.${nbDecimales}-${nbDecimales}`);
	}
}
