import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FormateDateService {

	constructor() {
	}

	/**
	 * Formate la période.
	 *
	 * @param dateDebut: date de debut d'exclusion.
	 * @param dateFin: date de fin d'exclusion.
	 * @return string[]: Liste de période.
	 * @public
	 */
	public formateDate(dateDebut: any, dateFin: any): string[] {
		let tableauDate: string[];
		let moisDebut = parseInt(dateDebut.getMonth()) + 1;
		let dDebut = dateDebut.getDate();
		let moisFin = parseInt(dateFin.getMonth()) + 1;
		let dFin = dateFin.getDate();

		let valeurDateDebut: string;
		let valeurDateFin: string;
		//date de debut
		if (moisDebut < 10 && dDebut < 10) {
			valeurDateDebut = dateDebut.getFullYear() + '-0' + moisDebut + '-0' + dDebut;

		} else if (moisDebut < 10 && dDebut > 10) {
			valeurDateDebut = dateDebut.getFullYear() + '-0' + moisDebut + '-' + dDebut;

		} else if (moisDebut > 10 && dDebut < 10) {
			valeurDateDebut = dateDebut.getFullYear() + '-' + moisDebut + '-0' + dDebut;
		} else if (moisDebut == 10 && dDebut < 10) {
			valeurDateDebut = dateDebut.getFullYear() + '-' + moisDebut + '-0' + dDebut;

		} else if (dDebut == 10 && moisDebut < 10) {
			valeurDateDebut = dateDebut.getFullYear() + '-0' + moisDebut + '-' + dDebut;

		} else {
			valeurDateDebut = dateDebut.getFullYear() + '-' + moisDebut + '-' + dDebut;
		}

		//date de fin
		if (moisFin < 10 && dFin < 10) {
			valeurDateFin = dateFin.getFullYear() + '-0' + moisFin + '-0' + dFin;

		} else if (moisFin < 10 && dFin > 10) {
			valeurDateFin = dateFin.getFullYear() + '-0' + moisFin + '-' + dFin;

		} else if (moisFin > 10 && dFin < 10) {
			valeurDateFin = dateFin.getFullYear() + '-' + moisFin + '-0' + dFin;

		} else if (moisFin == 10 && dFin < 10) {
			valeurDateFin = dateFin.getFullYear() + '-' + moisFin + '-0' + dFin;

		} else if (dFin == 10 && moisFin < 10) {
			valeurDateFin = dateFin.getFullYear() + '-0' + moisFin + '-' + dFin;

		} else {
			valeurDateFin = dateFin.getFullYear() + '-' + moisFin + '-' + dFin;
		}

		tableauDate = [valeurDateDebut, valeurDateFin];
		return tableauDate;
	}
}
