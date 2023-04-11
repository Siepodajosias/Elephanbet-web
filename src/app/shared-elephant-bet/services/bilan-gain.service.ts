import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BilanGain } from 'src/app/shared-elephant-bet/models/bilan-gain';
import { UrlServeur } from 'src/app/shared-elephant-bet/models/url-serveur';

@Injectable({
	providedIn: 'root'
})
export class BilanGainService {

	constructor(private http: HttpClient) {
	}

	/**
	 * Récupère les gains en fonction du mois et de la lmite d'excusion.
	 *
	 * @param mois: mois.
	 * @param limite: La limite d'exclusion.
	 * @return BilanGain[]: Liste des gains.
	 * @public
	 */
	public recupererBilanGainMois(mois: string, limite: number): Observable<BilanGain[]> {
		return this.http.get<BilanGain[]>(UrlServeur.bilanGain + '/mois/' + mois + '/' + limite);
	}

	/**
	 * Récupère les gains en fonction de l'année de la lmite d'excusion.
	 *
	 * @param annee: l'année.
	 * @param limite: La limite d'exclusion.
	 * @return BilanGain[]: Liste des gains.
	 * @public
	 */
	public recupererBilanGainAnnee(annee: string, limite: number): Observable<BilanGain[]> {
		return this.http.get<BilanGain[]>(UrlServeur.bilanGain + '/annee/' + annee + '/' + limite);
	}

	/**
	 * Récupère les gains en fonction de la période et de la limite d'exclusion.
	 *
	 * @param dateDebut: date de debut d'exclusion.
	 * @param dateFin: date de fin d'exclusion.
	 * @return BilanGain[] : Liste des gains.
	 * @public
	 */
	public recupererBilanGainPeriodeLimite(dateDebut: string, dateFin: string, limite: number): Observable<BilanGain[]> {
		return this.http.get<BilanGain[]>(UrlServeur.bilanGain + '/jour/' + dateDebut + '/' + dateFin + '/' + limite);
	}
}
