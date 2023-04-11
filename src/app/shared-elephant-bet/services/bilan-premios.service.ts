import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BilanPremios } from 'src/app/shared-elephant-bet/models/bilan-premios';
import { UrlServeur } from 'src/app/shared-elephant-bet/models/url-serveur';

@Injectable({
	providedIn: 'root'
})
export class BilanPremiosService {

	constructor(private http: HttpClient) {
	}

	/**
	 * Récupère le bilan premios en fonction du mois.
	 *
	 * @param mois: mois.
	 * @return BilanPremios[]: Liste du bilan prémios.
	 * @public
	 */
	public recupererBilanPremiosMois(mois: string): Observable<BilanPremios[]> {
		return this.http.get<BilanPremios[]>(UrlServeur.bilanPremios + '/mois/' + mois);
	}

	/**
	 * Récupère le bilan premios en fonction de l'année.
	 *
	 * @param annee: l'année.
	 * @return BilanPremios[]: Liste du bilan prémios.
	 * @public
	 */
	public recupererBilanPremiosAnnee(annee: string): Observable<BilanPremios[]> {
		return this.http.get<BilanPremios[]>(UrlServeur.bilanPremios + '/annee/' + annee);
	}

	/**
	 * Récupère le bilan premios en fonction de la période et de la limite d'exclusion.
	 *
	 * @param dateDebut: date de debut d'exclusion.
	 * @param dateFin: date de fin d'exclusion.
	 * @return BilanPremios[]: Liste du bilan prémios.
	 * @public
	 */
	public recupererBilanPremiosPeriode(dateDebut: string, dateFin: string): Observable<BilanPremios[]> {
		return this.http.get<BilanPremios[]>(UrlServeur.bilanPremios + '/jour/' + dateDebut + '/' + dateFin);
	}
}
