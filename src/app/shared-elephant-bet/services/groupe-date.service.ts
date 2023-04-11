import { Injectable } from '@angular/core';
import { GroupeDate, GroupeDateDto } from 'src/app/shared-elephant-bet/models/limite';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlServeur } from 'src/app/shared-elephant-bet/models/url-serveur';

@Injectable({
	providedIn: 'root'
})
export class GroupeDateService {

	constructor(private http: HttpClient) {
	}

	/**
	 * Récupère la liste de tous les groupes et dates d'exclution.
	 *
	 * @return GroupeDate[]: Liste des groupes et dates d'exclution.
	 * @public
	 */
	public recupererGroupeDate(): Observable<GroupeDate[]> {
		return this.http.get<GroupeDate[]>(UrlServeur.limite + '/code/' + 'GROUPES_ET_DATES');
	}

	/**
	 * Récupère un groupe et une date d'exclution.
	 *
	 * @return GroupeDate: Liste des groupes et dates d'exclution.
	 * @public
	 */
	public recupererGroupeDateById(IdgroupeDate: string): Observable<string[]> {
		return this.http.get<string[]>(UrlServeur.ticket + '/groupeId/' + IdgroupeDate);
	}

	/**
	 * Enregistre un groupe et une date d'exclution.
	 *
	 * @param groupeDate: Groupes et dates d'exclution à enregistrer.
	 * @return GroupeDate: Liste des groupes et dates d'exclution.
	 * @public
	 */
	public enregistrerGroupeDate(groupeDate: GroupeDateDto): Observable<GroupeDate> {
		return this.http.post<GroupeDate>(UrlServeur.limite + '/enregistrer', groupeDate);
	}

	/**
	 * Modifie un groupe et une date d'exclution.
	 *
	 * @param groupeDate: Groupes et dates d'exclution à modifier.
	 * @return GroupeDate: Liste des groupes et dates d'exclution.
	 * @public
	 */
	public modifierGroupeDate(groupeDate: GroupeDateDto): Observable<GroupeDate> {
		return this.http.put<GroupeDate>(UrlServeur.limite + '/modifier', groupeDate);
	}

	/**
	 * Supprime un groupe et une date d'exclution.
	 *
	 * @param idGroupeDate:  Identifiant du groupes et de la dates d'exclution à supprimer.
	 * @return GroupeDate: Liste des groupes et dates d'exclution.
	 * @public
	 */
	public supprimerGroupeDate(idGroupeDate: string): Observable<any> {
		return this.http.delete(UrlServeur.limite + '/supprimer/' + idGroupeDate);
	}
}
