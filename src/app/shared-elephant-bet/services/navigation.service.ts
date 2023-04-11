import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class NavigationService {
	constructor(private router: Router) {
	}

	public async goTo(route: string): Promise<void> {
		await this.router.navigate([route]);
	}

	/**
	 * Retourne vrai si l'url active est l connexion.
	 *
	 * @return boolean
	 * @public
	 */
	public isConnexion(): boolean {
		return this.router.url === '/connexion';
	}

	/**
	 * Retourne vrai si l'url active est tableau général.
	 *
	 * @return boolean
	 * @public
	 */
	public isBilanGeneral(): boolean {
		return this.router.url.includes('/tableau-general');
	}

	/**
	 * Retourne vrai si l'url active est tableau général online.
	 *
	 * @return boolean
	 * @public
	 */
	public isTableauGeneralOnline(): boolean {
		return this.router.url.includes('/tableauGeneral-online');
	}

	/**
	 * Retourne vrai si l'url active est tableau gain.
	 *
	 * @return boolean
	 * @public
	 */
	public isBilanGain(): boolean {
		return this.router.url.includes('/tableau-gain');
	}

	/**
	 * Retourne vrai si l'url active est tableau premios lojas.
	 *
	 * @return boolean
	 * @public
	 */
	public isTableauPremios(): boolean {
		return this.router.url.includes('/tableau-premios-Lojas');
	}

	/**
	 * Retourne vrai si l'url active est tableau mise.
	 * @return boolean
	 * @public
	 */
	public isTableauMise(): boolean {
		return this.router.url.includes('/tableau-mise');
	}

	/**
	 * Retourne vrai si l'url active est utilisateur.
	 *
	 * @return boolean
	 * @public
	 */
	public isUtilisateur(): boolean {
		return this.router.url.includes('/utilisateur');
	}

	/**
	 * Retourne vrai si l'url active est groupe date.
	 *
	 * @return boolean
	 * @public
	 */
	public isGroupeDate(): boolean {
		return this.router.url.includes('/groupe-date');
	}

	/**
	 * Retourne vrai si l'url active est limite ticket.
	 *
	 * @return boolean
	 * @public
	 */
	public isLimiteTicket(): boolean {
		return this.router.url.includes('/limite-ticket');
	}

	/**
	 * Retourne vrai si l'url active est limite gain.
	 *
	 * @return boolean
	 * @public
	 */
	public isLimiteGain(): boolean {
		return this.router.url.includes('/limite-gain');
	}

	/**
	 * Retourne vrai si l'url active est l'import online.
	 *
	 * @return boolean
	 * @public
	 */
	public isImportOnline(): boolean {
		return this.router.url.includes('/import-online');
	}

	/**
	 * Retourne vrai si l'url active est l'import premios lojas.
	 *
	 * @return boolean
	 * @public
	 */
	public isImportPremios(): boolean {
		return this.router.url.includes('/import-premios-lojas');
	}
}
