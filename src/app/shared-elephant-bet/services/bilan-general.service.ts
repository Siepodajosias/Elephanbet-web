import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BilanGeneral } from 'src/app/shared-elephant-bet/models/bilan-general';
import { HttpClient } from '@angular/common/http';
import { UrlServeur } from 'src/app/shared-elephant-bet/models/url-serveur';

@Injectable({
	providedIn: 'root'
})
export class BilanGeneralService {

	constructor(private http: HttpClient) {
	}

	/**
	 * Récupère le bilan général du mois.
	 *
	 * @param mois: mois.
	 * @return BilanGeneral[]: Liste du bilan général.
	 * @public
	 */
	public selectionBilanGeneralMois(mois: string): Observable<BilanGeneral[]> {
		return this.http.get<BilanGeneral[]>(UrlServeur.bilanGenaral + '/mois/' + mois);
	}

	/**
	 * Récupère le bilan général de l'année.
	 *
	 * @param annee: l'année.
	 * @return BilanGeneral[]: Liste du bilan général.
	 * @public
	 */
	public selectionBilanGeneralAnnee(annee: string): Observable<BilanGeneral[]> {
		return this.http.get<BilanGeneral[]>(UrlServeur.bilanGenaral + '/annee/' + annee);
	}

	/**
	 * Récupère le bilan général de la période.
	 *
	 * @param dateDebut: date de debut d'exclusion.
	 * @param dateFin: date de fin d'exclusion.
	 * @return BilanGeneral[]: Liste du bilan général.
	 * @public
	 */
	public selectionBilanGeneralPeriode(dateDebut: string, dateFin: string): Observable<BilanGeneral[]> {
		return this.http.get<BilanGeneral[]>(UrlServeur.bilanGenaral + '/jour/' + dateDebut + '/' + dateFin);
	}
}
