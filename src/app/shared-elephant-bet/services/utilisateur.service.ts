import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from 'src/app/shared-elephant-bet/models/utilisateur';
import { Observable } from 'rxjs';
import { UrlServeur } from 'src/app/shared-elephant-bet/models/url-serveur';

@Injectable({
	providedIn: 'root'
})
export class UtilisateurService {

	constructor(private http: HttpClient) {
	}

	/**
	 * Crée un utilisateur.
	 *
	 * @param utilisateur: L'utilisateur à enregistrer.
	 * @return Utilisateur
	 * @public
	 */
	public enregistrerUtilisateur(utilisateur: Utilisateur): Observable<any> {
		return this.http.post(UrlServeur.utilisateur + '/enregistrer', utilisateur);
	}

	/**
	 * Récupère la liste de tous les utilisateurs.
	 *
	 * @return Utilisateur[]: Liste des utilisateurs.
	 * @public
	 */
	public recupererUtilisateur(): Observable<Utilisateur[]> {
		return this.http.get<Utilisateur[]>(UrlServeur.utilisateur);
	}

	/**
	 * Supprime un utilisateur.
	 *
	 *@param idUtilisateur: Identifiant de l'utilisateur à supprimer.
	 *@return string
	 *@public
	 */
	public supprimerUtilisateur(idUtilisateur: number): Observable<any> {
		return this.http.delete(UrlServeur.utilisateur + '/supprimer/' + idUtilisateur);
	}

	/**
	 * Modifie un utilisateur.
	 *
	 * @param utilisateur: L'utilisateur à modifier.
	 * @return Utilisateur
	 * @public
	 */
	public modifierUtilisateur(utilisateur: Utilisateur): Observable<any> {
		return this.http.put(UrlServeur.utilisateur + '/modifier', utilisateur);
	}
}
