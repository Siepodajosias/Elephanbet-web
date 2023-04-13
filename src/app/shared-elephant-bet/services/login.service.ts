import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Tokens } from 'src/app/shared-elephant-bet/models/tokens';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/shared-elephant-bet/models/utilisateur';
import { UrlServeur } from 'src/app/shared-elephant-bet/models/url-serveur';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	private jwtToken: string;
	private jwtHelper = new JwtHelperService();

	constructor(private http: HttpClient) {
	}

	/**
	 * Authentifie un utilisateur.
	 *
	 * @param utilisateur: L'utilisateur à authentifier.
	 * @return tokens: Token de connection.
	 * @public
	 */
	public connexion(utilisateur: Utilisateur): Observable<Tokens> {
		return this.http.post<Tokens>(UrlServeur.connexion, utilisateur,
				{ headers: new HttpHeaders({ timeout: `${50000}` }) });
	}

	/**
	 * Enregistre le token dans le localStorage.
	 *
	 * @param jwtToken: Token à enregistrer.
	 * @public
	 */
	public enregistrerToken(jwtToken: string): void {
		this.jwtToken = jwtToken;
		localStorage.setItem('token', jwtToken);
	}

	/**
	 * Récupère le token dans le localStorage.
	 *
	 * @return any
	 * @public
	 */
	public recupererToken(): any {
		const token = localStorage.getItem('token');
		return token ? token : '';
	}

	/**
	 * Retourne l'utilisateur connecté.
	 *
	 * @return utilisateur
	 * @public
	 */
	public recupererUtilisateurConnecte(): Utilisateur {
		if (this.isAuthenticated()) {
			const utilisateur = new Utilisateur();
			const token = this.jwtHelper.decodeToken(this.recupererToken());
			utilisateur.id = token.id;
			utilisateur.nom = token.nom;
			utilisateur.prenoms = token.prenoms;
			utilisateur.username = token.username;
			utilisateur.role = token.role;
			return utilisateur;
		}
		return null;
	}

	/**
	 * Retourne l'etat du token.
	 * @public
	 */
	public isAuthenticated(): boolean {
		const token = this.recupererToken();
		if (token) {
			return !this.jwtHelper.isTokenExpired(token);
		}
		return false;
	}
}
