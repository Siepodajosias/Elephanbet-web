import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BilanMise } from 'src/app/shared-elephant-bet/models/bilan-mise';
import { UrlServeur } from 'src/app/shared-elephant-bet/models/url-serveur';

@Injectable({
	providedIn: 'root'
})
export class BilanMiseService {

	constructor(private http: HttpClient) {
	}

	/**
	 * Récupère les mises en fonction du mois et de la limite d'exclusion.
	 *
	 * @param mois: mois.
	 * @param limite: La limite d'exclusion.
	 * @return BilanMise[]: Liste du bilan mise.
	 * @public
	 */
	public recupererBilanMiseMois(mois: string, limite: number): Observable<BilanMise[]> {
		return this.http.get<BilanMise[]>(UrlServeur.bilanMise + '/mois/' + mois + '/' + limite);
	}

	/**
	 * Récupère les mises en fonction de l' année et de la limite d'exclusion.
	 *
	 * @param annee: l'année.
	 * @param limite: La limite d'exclusion.
	 * @return BilanMise[]: Liste du bilan mise.
	 * @public
	 */
	public recupererBilanMiseAnnee(annee: string, limite: number): Observable<BilanMise[]> {
		return this.http.get<BilanMise[]>(UrlServeur.bilanMise + '/annee/' + annee + '/' + limite);
	}

	/**
	 * Récupère les mises en fonction de la période et de la limite d'exclusion.
	 *
	 * @param dateDebut: date de debut d'exclusion.
	 * @param dateFin: date de fin d'exclusion.
	 * @return BilanMise[]: Liste du bilan mise.
	 * @public
	 */
	public recupererBilanMisePeriodeLimite(dateDebut: string, dateFin: string, limite: number): Observable<BilanMise[]> {
		return this.http.get<BilanMise[]>(UrlServeur.bilanMise + '/jour/' + dateDebut + '/' + dateFin + '/' + limite);
	}
}
