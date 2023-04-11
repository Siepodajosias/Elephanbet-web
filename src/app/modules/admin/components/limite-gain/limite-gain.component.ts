import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Limite } from 'src/app/shared-elephant-bet/models/limite';
import { LimiteService } from 'src/app/shared-elephant-bet/services/limite.service';

@Component({
	selector: 'app-limite-gain',
	templateUrl: './limite-gain.component.html',
	styleUrls: ['./limite-gain.component.scss']
})
export class LimiteGainComponent implements OnInit {
	editionParametrageVisible: boolean = false;
	limiteGains: Limite[];
	limiteGain: Limite;
	dateFuture = new Date();
	loading: boolean = true;

	constructor(private messageService: MessageService,
				private LimiteGainService: LimiteService,
				private confirmationService: ConfirmationService,
				private primeNgConfig: PrimeNGConfig) {
	}

	ngOnInit(): void {
		this.recupererExclusionGain();
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
	 * Demande une confirmation de suppression d'une exclusion sur les gains.
	 *
	 * @param limiteGain: Limite gain à suprimer.
	 */
	public supprimerExclusionGainMessage(limiteGain: any): void {
		this.confirmationService.confirm({
			message: 'Êtes-vous sûr de vouloir retirer cette exclusion?',
			header: 'Confirmer',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.supprimerExclusionGain(limiteGain);
			}
		});
	}

	/**
	 * Supprimer une exclusion sur les gains.
	 *
	 * @param limiteGain: Limite gain à suprimer.
	 */
	public supprimerExclusionGain(limiteGain: any): void {
		this.LimiteGainService.supprimerExclusionGain(limiteGain.id).subscribe({
			next: () => {
				this.messageService.add({
					severity: 'success', summary: 'Success',
					detail: 'Exclusion supprimée', icon: 'pi-file'
				});
				this.limiteGains = this.limiteGains.filter(val => val.id !== limiteGain.id);
			}, error: () => {
				this.messageService.add({
					severity: 'error', summary: 'Error', sticky: true,
					detail: 'Impossible de supprimer l\'exclusion'
				});
			}
		});
	}

	/**
	 * Récupère la liste des exclusions sur les gains.
	 */
	public recupererExclusionGain(): void {
		this.LimiteGainService.recupererExclusionGain().subscribe({
			next: (limites) => {
				this.limiteGains = limites ? limites : [];
				this.loading = false;
			}
		});
	}

	/**
	 * Ouvre la modale d'édition de la limite gain.
	 *
	 * @param limiteGain: Limite gain à éditer.
	 */
	public ouvrirModaleEdition(limiteGain?: Limite): void {
		this.limiteGain = limiteGain && limiteGain.id != null ? limiteGain : null;
		this.editionParametrageVisible = true;
	}

	public onParametrageModifie(event?: boolean): void {
		if (event) {
			this.recupererExclusionGain();
		}
	}
}
