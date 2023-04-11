import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { Limite } from 'src/app/shared-elephant-bet/models/limite';
import { LimiteService } from 'src/app/shared-elephant-bet/services/limite.service';
import { FormateDateService } from 'src/app/shared-elephant-bet/services/formate-date.service';

@Component({
	selector: 'app-limite-gain-modal',
	templateUrl: './limite-gain-modal.component.html',
	styleUrls: ['./limite-gain-modal.component.scss']
})
export class LimiteGainModalComponent implements OnInit {

	@Input() visible: boolean;
	@Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Input() limiteGain: Limite;
	@Output() parametreModifie: EventEmitter<boolean> = new EventEmitter<boolean>();
	limiteGainForm: FormGroup;
	dateFuture = new Date();
	loading: boolean = false;
	submitted: boolean = false;
	messageActif: boolean = false;
	messageErreur: Message[];

	constructor(private limiteGainForms: FormBuilder,
				private messageService: MessageService,
				private limiteGainService: LimiteService,
				private formateDateService: FormateDateService) {
	}

	ngOnInit(): void {
		this.limiteGainForm = this.limiteGainForms.group({
			id: [''],
			limiteDebut: ['', [Validators.required, Validators.maxLength(30)]],
			limiteFin: ['', [Validators.required, Validators.maxLength(30)]],
			dateDebutLimite: ['', [Validators.required, Validators.maxLength(30)]],
			dateFinLimite: ['', [Validators.required, Validators.maxLength(30)]]
		});
	}

	/**
	 * Ouvre la modal.
	 */
	public ouvertureModal(): void {
		if (this.limiteGain && this.limiteGain.id != null) {
			this.renseignerFormulaire(this.limiteGain);
		}
	}

	public controlerwLesSaisirDesLimites(event: KeyboardEvent, nomDuChamps: string): void {
		if (this.limiteGainForm.controls[nomDuChamps].value.length === 9 &&
				event.code !== 'Delete' &&
				event.code !== 'Backspace') {
			event.preventDefault();
		}
		if (event.key.match('^[0-9]$') ||
				event.code === 'Delete' ||
				event.code === 'Backspace') {
		} else {
			event.preventDefault();
		}
	}

	/**
	 * Renseigne les champs du formulaire avec les informations du regroupement à modifier.
	 *
	 * @param utilisateur: le regroupement à modifier.
	 */
	public renseignerFormulaire(limiteGain?: Limite): void {
		this.limiteGainForm.patchValue({
			id: limiteGain.id,
			limiteDebut: limiteGain.limiteDebut,
			limiteFin: limiteGain.limiteFin,
			dateDebutLimite: new Date(limiteGain.dateDebutLimite),
			dateFinLimite: new Date(limiteGain.dateFinLimite),
		});
	}

	/**
	 * Ferme la modal.
	 */
	public fermerModal(): void {
		this.visibleChange.emit(false);
		this.limiteGainForm.reset();
	}

	public enregistrerExclusion(): void {
		this.loading = true;
		const limiteGain = Object.assign(new Limite(), this.limiteGainForm.getRawValue());
		this.submitted = true;
		if (this.limiteGainForm.valid) {
			let limiteDebut = parseInt(this.limiteGainForm.get('limiteDebut')?.value);
			let limiteFin = parseInt(this.limiteGainForm.get('limiteFin')?.value);
			let dateDebutLimite = this.limiteGainForm.get('dateDebutLimite')?.value;
			let dateFinLimite = this.limiteGainForm.get('dateFinLimite')?.value;
			let tableauDate: string[] = this.formateDateService.formateDate(dateDebutLimite, dateFinLimite);
			if (limiteDebut > limiteFin && dateDebutLimite > dateFinLimite) {
				this.messageErreur = [
					{
						severity: 'error',
						detail: 'Enregistrement impossible, ' +
								'la limite de début est supérieure à ' +
								'la limite de fin et la date de début est supérieure à  la date de fin'
					},
				];
				this.messageActif = true;
				this.loading = false;

			} else if (limiteDebut > limiteFin && dateDebutLimite <= dateFinLimite) {
				this.messageErreur = [
					{
						severity: 'error',
						detail: 'Enregistrement impossible, ' +
								'la limite de début est supérieure à la limite de fin'
					},
				];
				this.messageActif = true;
				this.loading = false;
			} else if (dateDebutLimite > dateFinLimite && limiteDebut <= limiteFin) {
				this.messageErreur = [
					{
						severity: 'error',
						detail: 'Enregistrement impossible, ' +
								'la date de début est supérieure à  la date de fin'
					},
				];
				this.messageActif = true;
				this.loading = false;
			} else {
				if (limiteGain.id === '') {
					//enregistrer une limite gain
					this.submitted = false;
					const limitegain: Limite = new Limite();
					limitegain.code = 'LIMITES_GAINS';
					limitegain.limiteDebut = limiteDebut;
					limitegain.limiteFin = limiteFin;
					limitegain.dateDebutLimite = tableauDate[0];
					limitegain.dateFinLimite = tableauDate[1];
					this.enregistrement(limitegain);
				}
				//modifier la limite gain
				else {
					const limite: Limite = new Limite();
					limite.id = limiteGain.id;
					limite.code = limiteGain.code;
					limite.limiteDebut = limiteGain.limiteDebut;
					limite.limiteFin = limiteGain.limiteFin;
					limite.dateDebutLimite = tableauDate[0];
					limite.dateFinLimite = tableauDate[1];
					this.modification(limite);
				}
			}
		} else {
			this.loading = false;
		}
	}

	/**
	 * Enregistre une limite sur les gains.
	 *
	 * @param limiteGain: La limite à enregistrer.
	 */
	public enregistrement(limiteGain: Limite): void {
		this.limiteGainService.enregistrerExclusion(limiteGain).subscribe({
			next: () => {
				this.messageService.add({
					severity: 'success',
					summary: 'Success',
					detail: 'Limite de gains et période d\'exclusion enregistrés',
					icon: 'pi-file'
				});
				this.limiteGainForm.reset();
				this.parametreModifie.emit(true);
			},
			error: () => {
				this.messageService.add({
					severity: 'error',
					sticky: true,
					summary: 'Error',
					detail: 'Erreur lors de l\'enregistrement de ' +
							'la limite des gains et de la période d\'exclusion'
				});
			},
			complete: () => {
				this.loading = false;
				this.fermerModal();
			}
		});
	}

	/**
	 * Modifie une limite sur les gains.
	 *
	 * @param LimiteGain: La limite à modifier.
	 */
	public modification(LimiteGain: Limite): void {
		this.limiteGainService.modifierExclusion(LimiteGain).subscribe({
			next: (value) => {
				this.messageService.add({
					severity: 'info',
					summary: 'Info',
					detail: 'La modification à été éffectué',
					icon: 'pi-file'
				});
				this.limiteGainForm.reset();
				this.parametreModifie.emit(true);
			}, error: () => {
				this.messageService.add({
					severity: 'error',
					sticky: true,
					summary: 'Error',
					detail: 'Erreur lors de la modification'
				});
			}, complete: () => {
				this.loading = false;
				this.fermerModal();
			}
		});
	}
}
