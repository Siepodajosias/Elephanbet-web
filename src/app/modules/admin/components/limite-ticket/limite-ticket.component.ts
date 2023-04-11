import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Limite } from 'src/app/shared-elephant-bet/models/limite';
import { LimiteService } from 'src/app/shared-elephant-bet/services/limite.service';

@Component({
	selector: 'app-limite-ticket',
	templateUrl: './limite-ticket.component.html',
	styleUrls: ['./limite-ticket.component.scss']
})
export class LimiteTicketComponent implements OnInit {
	editionParametrageVisible: boolean = false;
	limiteTickets: Limite[];
	limiteTicket: Limite;
	loading: boolean = true;

	constructor(private messageService: MessageService,
				private limiteTicketService: LimiteService,
				private confirmationService: ConfirmationService,
				private primeNgConfig: PrimeNGConfig) {
	}

	ngOnInit(): void {
		this.recupererExclusionTicket();
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

	/**
	 * Demande une confirmation de suppression d'une exclusion sur les tickets.
	 *
	 * @param limiteTicket: Limite ticket à suprimer.
	 */
	public supprimerExclusionTicketMessage(limiteTicket: any): void {
		this.confirmationService.confirm({
			message: 'Êtes-vous sûr de vouloir retirer cette exclusion?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.supprimerExclusionTicket(limiteTicket);
			}
		});
	}

	/**
	 * Supprime une exclusion sur les tickets.
	 *
	 * @param limiteTicket: Limite ticket à suprimer.
	 */
	public supprimerExclusionTicket(limiteTicket: any): void {
		this.limiteTicketService.supprimerExclusionTicket(limiteTicket.id).subscribe({
			next: () => {
				this.messageService.add({
					severity: 'success',
					summary: 'Success',
					detail: 'Exclusion supprimée',
					icon: 'pi-file'
				});
				this.limiteTickets = this.limiteTickets.filter(val => val.id !== limiteTicket.id);
			},
			error: () => {
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					sticky: true,
					detail: 'Impossible de supprimer l\'exclusion'
				});
			}
		});
	}

	/**
	 * Récupère la liste des exclusions sur les gains.
	 */
	public recupererExclusionTicket(): void {
		this.limiteTicketService.recupererExclusionTicket().subscribe({
			next: (limites) => {
				this.limiteTickets = limites ? limites : [];
				this.loading = false;
			}
		});
	}

	/**
	 * Ouvre la modale d'édition de la limite ticket.
	 *
	 * @param limiteTicket: Limite ticket à éditer.
	 */
	public ouvrirModaleEdition(limiteTicket?: Limite): void {
		this.limiteTicket = limiteTicket && limiteTicket.id != null ? limiteTicket : null;
		this.editionParametrageVisible = true;
	}

	public onParametrageModifie(event?: boolean): void {
		if (event) {
			this.recupererExclusionTicket();
		}
	}
}
