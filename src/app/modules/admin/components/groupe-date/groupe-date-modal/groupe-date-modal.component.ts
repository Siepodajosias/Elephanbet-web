import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { GroupeDate, GroupeDateDto } from 'src/app/shared-elephant-bet/models/limite';
import { GroupeDateService } from 'src/app/shared-elephant-bet/services/groupe-date.service';
import { FormateDateService } from 'src/app/shared-elephant-bet/services/formate-date.service';

@Component({
	selector: 'app-groupe-date-modal',
	templateUrl: './groupe-date-modal.component.html',
	styleUrls: ['./groupe-date-modal.component.scss']
})
export class GroupeDateModalComponent implements OnInit {
	@Input() visible: boolean;
	@Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Input() groupeDate: GroupeDate;
	filteredgroupe: string[];
	@Output() parametreModifie: EventEmitter<boolean> = new EventEmitter<boolean>();
	groupeDateForm: FormGroup;
	dateFuture = new Date();
	groupeSelectionner: String;
	submitted: boolean = false;
	messageActif: boolean = false;
	messageErreur: Message[];
	groupeErreur: Message[];
	loading: boolean = false;

	constructor(private groupeDateForms: FormBuilder,
				private messageService: MessageService,
				private groupeDateService: GroupeDateService,
				private datePipe: DatePipe,
				private formateDateService: FormateDateService) {
	}

	ngOnInit(): void {
		this.groupeDateForm = this.groupeDateForms.group({
			id: [''],
			groupe: ['', [Validators.required, Validators.minLength(1)]],
			dateDebutLimite: ['', [Validators.required, Validators.maxLength(30)]],
			dateFinLimite: ['', [Validators.required, Validators.maxLength(30)]],
		});
	}

	/**
	 * Ouvre la modal.
	 */
	public ouvertureModal(): void {
		if (this.groupeDate && this.groupeDate.id != null) {
			this.renseignerFormulaire(this.groupeDate);
		}
	}

	/**
	 * Renseigne les champs du formulaire avec les informations du regroupement à modifier.
	 *
	 * @param utilisateur: Le regroupement à modifier.
	 */
	public renseignerFormulaire(groupeDate?: GroupeDate): void {
		this.groupeSelectionner = groupeDate.groupe;
		this.groupeDateForm.patchValue({
			id: groupeDate.id,
			groupe: groupeDate.groupe,
			dateDebutLimite: new Date(groupeDate.dateDebutLimite),
			dateFinLimite: new Date(groupeDate.dateFinLimite)
		});
	}

	/**
	 * Enregistre une exclusion de groupe et date.
	 */
	public enregistrerGroupeDate(): void {
		this.loading = true;
		const groupeDate = Object.assign(new GroupeDate(), this.groupeDateForm.getRawValue());
		this.submitted = true;
		if (this.groupeDateForm.valid) {
			let dateDebutLimite = this.groupeDateForm.get('dateDebutLimite')?.value;
			let dateFinLimite = this.groupeDateForm.get('dateFinLimite')?.value;
			let tableauDate: string[] = this.formateDateService.formateDate(dateDebutLimite, dateFinLimite);
			// verification de la saisie de date
			if (this.groupeSelectionner && this.groupeSelectionner === this.groupeDateForm.get('groupe')?.value) {
				//enregistrer un groupe et une date
				if (!groupeDate.id) {
					this.submitted = false;
					if (tableauDate[0] <= tableauDate[1]) {
						let groupedate: GroupeDateDto = new GroupeDateDto();
						groupedate.code = 'GROUPES_ET_DATES';
						groupedate.groupe = this.groupeDateForm.get('groupe')?.value;
						groupedate.dateDebutLimite = tableauDate[0];
						groupedate.dateFinLimite = tableauDate[1];
						this.enregistrement(groupedate);
					} else {
						this.messageErreur = [
							{
								severity: 'error',
								detail: 'Enregistrement impossible, ' +
										'la date de début est supérieure à  la date de fin'
							}
						];
						this.messageActif = true;
						this.loading = false;
					}
				}
				//modifier d' un groupe et d' une date
				else {
					if (tableauDate[0] <= tableauDate[1]) {
						let updateGroupedate: GroupeDateDto = new GroupeDateDto();
						updateGroupedate.id = groupeDate.id;
						updateGroupedate.code = groupeDate.code;
						updateGroupedate.groupe = groupeDate.groupe;
						updateGroupedate.dateDebutLimite = tableauDate[0];
						updateGroupedate.dateFinLimite = tableauDate[1];
						this.modification(updateGroupedate);
					} else {
						this.messageErreur = [
							{
								severity: 'error',
								detail: 'Enregistrement impossible, ' +
										'la date de debut est supérieure à la date de fin'
							},
						];
						this.messageActif = true;
					}
				}
			} else {
				this.loading = false;
				this.groupeErreur = [
					{
						severity: 'error',
						detail: 'Enregistrement impossible, ' +
								'choissisez un groupe valide'
					},
				];
			}
		} else {
			this.loading = false;
		}
	}

	/**
	 * Enregistre un groupe et une date d'exclusion.
	 *
	 * @param groupedate
	 */
	public enregistrement(groupedate: GroupeDateDto): void {
		this.groupeDateService.enregistrerGroupeDate(groupedate).subscribe({
			next: (value) => {
				this.messageService.add({
					severity: 'success', summary: 'Success',
					detail: 'Groupe et période d\'exclusion enregistrés', icon: 'pi-file'
				});
				this.groupeDateForm.reset();
				this.parametreModifie.emit(true);
			}, error: () => {
				this.messageService.add({
					severity: 'error',
					sticky: true,
					summary: 'Error',
					detail: 'Erreur lors de l\'enregistrement du Groupe et de la période d\'exclusion'
				});
			}, complete: () => {
				this.loading = false;
				this.fermerModal();
			}
		});
	}

	/**
	 * Modifie un groupe et une date d'exclusion.
	 *
	 * @param Groupedate: Groupe et date à modifier.
	 */
	public modification(Groupedate: GroupeDateDto): void {
		this.groupeDateService.modifierGroupeDate(Groupedate).subscribe({
			next: (value) => {
				this.messageService.add({
					severity: 'info',
					summary: 'Info',
					detail: 'La modification à été éffectué',
					icon: 'pi-file'
				});
				this.groupeDateForm.reset();
				this.parametreModifie.emit(true);
			}, error: () => {
				this.messageService.add({
					severity: 'error',
					sticky: true,
					summary: 'Echec',
					detail: 'Erreur lors de la modification'
				});
			}, complete: () => {
				this.loading = true;
				this.fermerModal();
			}
		});
	}

	public seclectionDeGroupe(event: any): void {
		this.groupeSelectionner = event;
	}

	/**
	 * Ferme la modal.
	 */
	public fermerModal(): void {
		this.visibleChange.emit(false);
		this.groupeDateForm.reset();
	}

	public filterGroupe(event: any): void {
		let filtered: any[] = [];
		let groupe: string[];
		let query = event.query;
		this.groupeDateService.recupererGroupeDateById(query).subscribe({
			next: (value) => {
				groupe = value ? value : [];
				if (groupe) {
					for (let i = 0; i < groupe.length; i++) {
						let grp = groupe[i];
						if (grp.toLowerCase().indexOf(query.toLowerCase()) == 0) {
							filtered.push(grp);
						}
					}
					this.filteredgroupe = filtered;
				}
			}
		});
	}
}
