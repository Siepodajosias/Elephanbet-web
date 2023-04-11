import { Component, OnInit } from '@angular/core';
import { GroupeDateService } from 'src/app/shared-elephant-bet/services/groupe-date.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { GroupeDate } from 'src/app/shared-elephant-bet/models/limite';

@Component({
	selector: 'app-groupe-date',
	templateUrl: './groupe-date.component.html',
	styleUrls: ['./groupe-date.component.scss']
})
export class GroupeDateComponent implements OnInit {
	editionParametrageVisible: boolean = false;
	groupeDates: GroupeDate[];
	groupeDate: GroupeDate;
	loading: boolean = true;

	constructor(private messageService: MessageService,
				private groupeDateService: GroupeDateService,
				private confirmationService: ConfirmationService,
				private primeNgConfig: PrimeNGConfig) {
	}

	ngOnInit(): void {
		this.recupererGroupeDatesExclusions();
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
	 * Demande une confirmation de suppression d'un groupe et une date d'exclusion sur le bilan général.
	 *
	 * @param groupedate: Groupe et date d'exclusion à supprimer.
	 */
	public supprimerGroupeDateMessage(groupedate: any): void {
		this.confirmationService.confirm({
			message: 'Êtes-vous sûr de vouloir retirer cette exclusion?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.supprimerGroupeDateExclusion(groupedate);
			}
		});
	}

	/**
	 * Supprime un groupe et une date d'exclusion.
	 *
	 * @param groupedate: Groupe et date d'exclusion à supprimer.
	 */
	public supprimerGroupeDateExclusion(groupedate: any): void {
		this.groupeDateService.supprimerGroupeDate(groupedate.id).subscribe({
			next: () => {
				this.messageService.add({
					severity: 'info',
					summary: 'Info',
					detail: 'Groupe et période d\'exclusion supprimés',
					icon: 'pi-file'
				});
				this.groupeDates = this.groupeDates.filter(val => val.id !== groupedate.id);
			},
			error: () => {
				this.messageService.add({
					severity: 'error',
					sticky: true,
					summary: 'Error',
					detail: 'Impossible de supprimer ' +
							'le groupe et la période d\'exclusion'
				});
			}
		});
	}

	/**
	 *Récupère la liste des exclusions sur le bilan général.
	 */
	public recupererGroupeDatesExclusions(): void {
		this.groupeDateService.recupererGroupeDate()
				.subscribe({
					next: (goupeDates) => {
						this.groupeDates = goupeDates;
						this.loading = false;
					}
				});
	}

	/**
	 * Ouvre la modale d'édition du groupe et date.
	 *
	 * @param groupeDate: Groupe et date à éditer.
	 */
	public ouvrirModaleEdition(groupeDate?: GroupeDate): void {
		this.groupeDate = groupeDate && groupeDate.id != null ? groupeDate : null;
		this.editionParametrageVisible = true;
	}

	public onParametrageModifie(event?: boolean) {
		if (event) {
			this.recupererGroupeDatesExclusions();
		}
	}
}
