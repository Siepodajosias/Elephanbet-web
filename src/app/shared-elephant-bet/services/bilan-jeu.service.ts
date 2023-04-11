import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BilanJeu } from 'src/app/shared-elephant-bet/models/bilan-jeu';
import { UrlServeur } from 'src/app/shared-elephant-bet/models/url-serveur';

@Injectable({
	providedIn: 'root'
})
export class BilanJeuService {

	constructor(private http: HttpClient) {
	}

	/**
	 * Récupère le bilan jeu du mois.
	 *
	 * @param mois: mois.
	 * @return BilanJeu[]: Liste du bilan jeu.
	 * @public
	 */
	public recupererBilanJeuMois(mois: string): Observable<BilanJeu[]> {
		return this.http.get<BilanJeu[]>(UrlServeur.bilanJeu + '/mois/' + mois);
	}

	/**
	 * Récupère le bilan jeu de année.
	 *
	 * @param annee: L'année.
	 * @return BilanJeu[]: Liste du bilan jeu.
	 * @public
	 */
	public recupererBilanJeuAnnee(annee: string): Observable<BilanJeu[]> {
		return this.http.get<BilanJeu[]>(UrlServeur.bilanJeu + '/annee/' + annee);
	}

	/**
	 * Récupère le bilan jeu de la période et de la limite d'exclusion.
	 *
	 * @param dateDebut: date de debut d'exclusion.
	 * @param dateFin: date de fin d'exclusion.
	 * @return BilanJeu[]: Liste du bilan jeu.
	 * @public
	 */
	public recupererBilanJeuPeriode(dateDebut: string, dateFin: string): Observable<BilanJeu[]> {
		return this.http.get<BilanJeu[]>(UrlServeur.bilanJeu + '/jour/' + dateDebut + '/' + dateFin);
	}
}
