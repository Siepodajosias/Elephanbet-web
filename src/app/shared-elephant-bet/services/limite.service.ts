import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Limite } from 'src/app/shared-elephant-bet/models/limite';
import { UrlServeur } from 'src/app/shared-elephant-bet/models/url-serveur';

@Injectable({
	providedIn: 'root'
})
export class LimiteService {

	constructor(private http: HttpClient) {
	}

	/**
	 * Récupère la liste de tous les exclutions sur les tickets.
	 *
	 * @return Limite[]: Liste de tous les limites tickets.
	 * @public
	 */
	public recupererExclusionTicket(): Observable<Limite[]> {
		return this.http.get<Limite[]>(UrlServeur.limite + '/code/' + 'LIMITE_TICKETS');
	}

	/**
	 * Enregistre une exclution sur les tickets ou sur les gains.
	 *
	 * @return Limite: La limite à enregistrer.
	 * @public
	 */
	public enregistrerExclusion(limite: Limite): Observable<Limite> {
		return this.http.post<Limite>(UrlServeur.limite + '/enregistrer', limite);
	}

	/**
	 * Modifie une exclution sur les tickets.
	 *
	 * @return Limite: La limite à modfier.
	 * @public
	 */
	public modifierExclusion(limite: Limite): Observable<Limite> {
		return this.http.put<Limite>(UrlServeur.limite + '/modifier', limite);
	}

	/**
	 * Supprime une exclution sur les tickets.
	 *
	 * @param idExculsion: Identifiant de l'exclution à supprimer.
	 * @public
	 */
	public supprimerExclusionTicket(idExculsion: number): Observable<any> {
		return this.http.delete(UrlServeur.limite + '/supprimer/' + idExculsion);
	}

	/**
	 * Récupère la liste de tous les exclutions sur les gains.
	 *
	 * @return Limite[]: Liste de tous les limites gains.
	 * @public
	 */
	public recupererExclusionGain(): Observable<Limite[]> {
		return this.http.get<Limite[]>(UrlServeur.limite + '/code/' + 'LIMITES_GAINS');
	}

	/**
	 * Supprime une exclution sur les gains.
	 *
	 * @param idExculsion: Identifiant de l'exclution à supprimer.
	 * @public
	 */
	public supprimerExclusionGain(idExculsion: number): Observable<any> {
		return this.http.delete(UrlServeur.limite + '/supprimer/' + idExculsion);
	}
}
