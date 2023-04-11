import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { Limite } from 'src/app/shared-elephant-bet/models/limite';
import { LimiteService } from 'src/app/shared-elephant-bet/services/limite.service';
import { FormateDateService } from 'src/app/shared-elephant-bet/services/formate-date.service';

@Component({
	selector: 'app-limite-ticket-modal',
	templateUrl: './limite-ticket-modal.component.html',
	styleUrls: ['./limite-ticket-modal.component.scss']
})
export class LimiteTicketModalComponent implements OnInit {

	@Input() visible: boolean;
	@Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Input() limiteTicket: Limite;
	@Output() parametreModifie: EventEmitter<boolean> = new EventEmitter<boolean>();
	limiteTicketForm: FormGroup = new FormGroup({});
	dateFuture = new Date();
	submitted: boolean = false;
	messageActif: boolean = false;
	messageErreur: Message[];
	loading: boolean = false;

	constructor(private limiteTicketForms: FormBuilder,
				private messageService: MessageService,
				private limiteTicketService: LimiteService,
				private formateDateService: FormateDateService) {
	}

	ngOnInit(): void {
		this.limiteTicketForm = this.limiteTicketForms.group({
			id: [''],
			limiteDebut: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(9)]],
			limiteFin: ['', [Validators.required, Validators.maxLength(9)]],
			dateDebutLimite: ['', [Validators.required, Validators.maxLength(30)]],
			dateFinLimite: ['', [Validators.required, Validators.maxLength(30)]]
		});
	}

	/**
	 * Ouvre la modal.
	 */
	public ouvertureModal() {
		if (this.limiteTicket && this.limiteTicket.id != null) {
			this.renseignerFormulaire(this.limiteTicket);
		}
	}

	/**
	 * Renseigne les champs du formulaire avec les informations du regroupement à modifier.
	 *
	 * @param utilisateur: le regroupement à modifier.
	 */
	public renseignerFormulaire(limiteTicket?: Limite): void {
		this.limiteTicketForm.patchValue({
			id: limiteTicket.id,
			limiteDebut: limiteTicket.limiteDebut,
			limiteFin: limiteTicket.limiteFin,
			dateDebutLimite: new Date(limiteTicket.dateDebutLimite),
			dateFinLimite: new Date(limiteTicket.dateFinLimite),
		});
	}

	/**
	 * Ferme la modal.
	 */
	public fermerModal(): void {
		this.visibleChange.emit(false);
		this.limiteTicketForm.reset();
	}

	public controlerwLesSaisirDesLimites(event: KeyboardEvent, nomDuChamps: string): void {
		if (this.limiteTicketForm.controls[nomDuChamps].value.length === 9 &&
				event.code !== 'Delete' && event.code !== 'Backspace') {
			event.preventDefault();
		}
		if (event.key.match('^[0-9]$') ||
				event.code === 'Delete' ||
				event.code === 'Backspace') {
		} else {
			event.preventDefault();
		}
	}

	public enregistrerExclusion(): void {
		this.loading = true;
		const limiteTicket = Object.assign(new Limite(), this.limiteTicketForm.getRawValue());
		this.submitted = true;
		if (this.limiteTicketForm.valid) {
			const limiteDebut = parseInt(this.limiteTicketForm.get('limiteDebut')?.value);
			const limiteFin = parseInt(this.limiteTicketForm.get('limiteFin')?.value);
			const dateDebutLimite = this.limiteTicketForm.get('dateDebutLimite')?.value;
			const dateFinLimite = this.limiteTicketForm.get('dateFinLimite')?.value;
			const tableauDate: string[] = this.formateDateService.formateDate(dateDebutLimite, dateFinLimite);
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
						severity: 'error', detail: 'Enregistrement impossible, ' +
								'la limite de début est supérieure à la limite de fin'
					},
				];
				this.messageActif = true;
				this.loading = false;
			} else if (dateDebutLimite > dateFinLimite && limiteDebut <= limiteFin) {
				this.messageErreur = [
					{
						severity: 'error', detail: 'Enregistrement impossible, ' +
								'la date de début est supérieure à  la date de fin'
					},
				];
				this.messageActif = true;
				this.loading = false;
			} else {
				if (limiteTicket.id === '') {
					//enregistrer une limite ticket
					this.submitted = false;
					const limiteticket: Limite = new Limite();
					limiteticket.code = 'LIMITE_TICKETS';
					limiteticket.limiteDebut = limiteDebut;
					limiteticket.limiteFin = limiteFin;
					limiteticket.dateDebutLimite = tableauDate[0];
					limiteticket.dateFinLimite = tableauDate[1];
					this.enregistrement(limiteticket);
				}
				//modifier la limite ticket
				else {
					const updateLimiteTicket: Limite = new Limite();
					updateLimiteTicket.id = limiteTicket.id;
					updateLimiteTicket.code = limiteTicket.code;
					updateLimiteTicket.limiteDebut = limiteTicket.limiteDebut;
					updateLimiteTicket.limiteFin = limiteTicket.limiteFin;
					updateLimiteTicket.dateDebutLimite = tableauDate[0];
					updateLimiteTicket.dateFinLimite = tableauDate[1];
					this.modification(updateLimiteTicket);
				}
			}
		} else {
			this.loading = false;
		}
	}

	/**
	 * Enregistre une limite sur les tickets.
	 *
	 * @param limiteticket: La limite à enregistrer.
	 */
	private enregistrement(limiteticket: Limite): void {
		this.limiteTicketService.enregistrerExclusion(limiteticket).subscribe({
			next: (value) => {
				this.messageService.add({
					severity: 'success',
					summary: 'Success',
					detail: 'L\'exclusion à été enregistré',
					icon: 'pi-file'
				});
				this.limiteTicketForm.reset();
				this.parametreModifie.emit(true);
			}, error: () => {
				this.messageService.add({
					severity: 'error',
					summary: 'Error',
					sticky: true,
					detail: 'Impossible d\'enregistrer l\'exclusion'
				});
			}, complete: () => {
				this.loading = false;
				this.fermerModal();
			}
		});
	}

	/**
	 * Modifie une limite sur les tickets.
	 *
	 * @param limiteTicket: La limite à modifier.
	 */
	private modification(limiteTicket: Limite): void {
		this.limiteTicketService.modifierExclusion(limiteTicket).subscribe({
			next: (value) => {
				this.parametreModifie.emit(true);
				this.messageService.add({
					severity: 'info', summary: 'Info',
					detail: 'La modification à été éffectué',
					icon: 'pi-file'
				});
			}, error: () => {
				this.messageService.add({
					severity: 'error',
					summary: 'Erreur',
					sticky: true,
					detail: 'Erreur lors de la modification',
					icon: 'pi-file'
				});
			}, complete: () => {
				this.loading = false;
				this.fermerModal();
			}
		});
	}
}
