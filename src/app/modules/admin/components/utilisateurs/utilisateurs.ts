import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Utilisateur } from 'src/app/shared-elephant-bet/models/utilisateur';
import { UtilisateurService } from 'src/app/shared-elephant-bet/services/utilisateur.service';

@Component({
	selector: 'app-utiliateurs',
	templateUrl: './utilisateurs.html',
	styleUrls: ['./utilisateurs.scss']
})
export class Utilisateurs implements OnInit {
	editionUtilisateurVisible: boolean = false;
	utilisateur: Utilisateur;
	utilisateurs: Utilisateur[];
	loading: boolean = true;
	statut: any[];
	roleOptions: any[];

	constructor(private messageService: MessageService,
				private utilisateurService: UtilisateurService,
				private confirmationService: ConfirmationService,
				private primeNgConfig: PrimeNGConfig) {
	}

	ngOnInit(): void {
		this.recupererUtilisateurs();
		this.recupererConfig();
		this.statut = [
			{ label: 'Pas de filtre', value: '' },
			{ label: 'Activé', value: true },
			{ label: 'Desactivé', value: false }
		];
		this.roleOptions = [
			{ label: 'Pas de filtre', value: '' },
			{ label: 'Administrateur', value: 'ADMIN' },
			{ label: 'Lecteur simple', value: 'LECTEUR_SIMPLE' }
		];

	}

	/**
	 * Ouvre la modale d'édition d'un utilisateur.
	 *
	 * @param utilisateur: L'utilisateur à modifier.
	 */
	public ouvrirModaleEdition(utilisateur?: Utilisateur): void {
		this.utilisateur = utilisateur && utilisateur.id != null ? utilisateur : null;
		this.editionUtilisateurVisible = true;
	}

	/**
	 * Supprimer un utilisateur sur système.
	 *
	 * @param utilisateur: L'utilisateur à supprimer.
	 */
	public supprimerUtilisateur(utilisateur: any): void {
		this.confirmationService.confirm({
			message: 'Supprimer l\'utilisateur ' + utilisateur.nom + '?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.retirerUtilisateur(utilisateur);
			}
		});
	}

	/**
	 * Retirer un utilisateur sur système.
	 *
	 * @param utilisateur: L'utilisateur à retirer.
	 */
	public retirerUtilisateur(utilisateur: any): void {
		this.utilisateurService.supprimerUtilisateur(utilisateur.id).subscribe({
			next: (v: string) => {
				this.messageService.add({
					severity: 'info',
					summary: 'Suppression',
					detail: 'l\'utilisateur a été supprimé',
					icon: 'pi-file'
				});
				this.utilisateurs = this.utilisateurs.filter(val => val.id !== utilisateur.id);
			},
			error: () => {
				this.messageService.add({
					severity: 'error',
					sticky: true,
					summary: 'Erreur',
					detail: 'l\'utilisateur ne peut pas être supprimé',
					icon: 'pi-file'
				});
			}
		});
	}

	/**
	 * Recupère la liste des utilisateurs.
	 */
	public recupererUtilisateurs(): void {
		this.utilisateurService.recupererUtilisateur().subscribe(
				(value) => {
					this.utilisateurs = value ? value : [];
					this.loading = false;
				}
		);
	}

	public onUtilisateurModifie(event?: boolean): void {
		if (event) {
			this.recupererUtilisateurs();
		}
	}

	/**
	 * Traduit les filtres en français.
	 */
	public recupererConfig(): void {
		this.primeNgConfig.setTranslation({
			startsWith: 'Commence par',
			contains: 'Contient',
			notContains: 'Ne contient pas',
			endsWith: 'Fini par',
			equals: 'Egale à',
			notEquals: 'Différent de',
			noFilter: 'Pas de filtre',
			reject: 'Non',
			accept: 'Oui'
		});
	}
}
