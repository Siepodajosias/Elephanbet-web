import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/shared-elephant-bet/models/utilisateur';
import { UtilisateurService } from 'src/app/shared-elephant-bet/services/utilisateur.service';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'utilisateur-modal',
	templateUrl: './utilisateur-modal.html',
	styleUrls: ['./utilisateur-modal.scss']
})
export class UtilisateurModal implements OnInit {
	@Input() visible: boolean;
	@Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Input() utilisateur: Utilisateur;
	@Output() utilisateurModifie: EventEmitter<boolean> = new EventEmitter<boolean>();
	utilisateurForm: FormGroup;
	roles: { code: string, designation: string }[];
	loading: boolean = false;
	passwordRequired: boolean = false;

	constructor(private formBuilder: FormBuilder,
				private messageService: MessageService,
				private utilisateurService: UtilisateurService) {
	}

	ngOnInit(): void {
		this.utilisateurForm = this.formBuilder.group({
			id: [''],
			nom: ['', [Validators.required, Validators.minLength(3)]],
			prenoms: ['', [Validators.required, Validators.minLength(3)]],
			username: ['', [Validators.required, Validators.minLength(3)]],
			password: [''],
			role: ['', [Validators.required]]
		});
		this.roles = [
			{ code: 'ADMIN', designation: 'Administrateur' },
			{ code: 'LECTEUR_SIMPLE', designation: 'Lecteur simple' }
		];
	}

	/**
	 * Ouvre la modal.
	 */
	public ouvertureModal(): void {
		if (this.utilisateur && this.utilisateur.id != null) {
			this.renseignerFormulaire(this.utilisateur);
		}
	}

	/**
	 * Renseigne les champs du formulaire avec les informations du regroupement à modifier.
	 *
	 * @param utilisateur: Le regroupement à modifier.
	 */
	public renseignerFormulaire(utilisateur?: Utilisateur): void {
		const role = utilisateur.role === 'ADMIN' ?
				{ code: utilisateur.role, designation: 'Administrateur' } :
				{ code: utilisateur.role, designation: 'Lecteur simple' };
		this.utilisateurForm.patchValue({
			id: utilisateur.id,
			nom: utilisateur.nom,
			prenoms: utilisateur.prenoms,
			username: utilisateur.username,
			role: role
		});
	}

	/**
	 * Enregistre ou de modifie un utilisateur.
	 */
	public enregistrerUtilisateur(): void {
		const utilisateur = Object.assign(new Utilisateur(),
				this.utilisateurForm.getRawValue());
		let role = this.utilisateurForm.get('role')?.value;
		utilisateur.role = role.code;
		this.loading = true;
		if (this.utilisateurForm.valid) {
			//enregistrement
			if (utilisateur && !utilisateur.id) {
				if (utilisateur.password === '') {
					this.passwordRequired = true;
					this.loading = false;
				} else {
					this.enregistrement(utilisateur);
				}
			}
			//modification
			else {
				this.modification(utilisateur);
			}
		} else {
			this.passwordRequired = true;
			this.loading = false;
		}
	}

	/**
	 * Contrôle la saisie des mots de passes.
	 */
	public changementDeMotPasse(): void {
		if (this.utilisateurForm.controls['password'].value.length === 0) {
			this.passwordRequired = true;
		} else {
			this.passwordRequired = false;
		}
	}

	/**
	 * Ferme la modal de création et de modification.
	 */
	public fermerModal(): void {
		this.visibleChange.emit(false);
		this.utilisateurForm.reset();
	}

	/**
	 * Modifie un utilisateur.
	 *
	 * @param utilisateur: L'utilisateur à modifier.
	 */
	public modification(utilisateur: Utilisateur): void {
		this.utilisateurService.modifierUtilisateur(utilisateur).subscribe({
			next: () => {
				this.utilisateurModifie.emit(true);
				this.messageService.add({
					severity: 'info',
					summary: 'Info',
					detail: 'La modification à été éffectuée',
					icon: 'pi-file'
				});
			},
			error: () => {
				this.messageService.add({
					severity: 'error',
					sticky: true,
					summary: 'Erreur',
					detail: 'Erreur lors de la modification',
					icon: 'pi-file'
				});
			},
			complete: () => {
				this.loading = false;
				this.fermerModal();
			}
		});
	}

	/**
	 * Enregistre un utilisateur.
	 *
	 * @param utilisateur: L' utilisateur à enregistrer.
	 */
	public enregistrement(utilisateur: Utilisateur): void {
		this.utilisateurService.enregistrerUtilisateur(utilisateur).subscribe({
			next: () => {
				this.utilisateurModifie.emit(true);
				this.messageService.add({
					severity: 'success',
					summary: 'Success',
					detail: 'l\'enregistrement a été éffectué',
					icon: 'pi-file'
				});
			},
			error: () => {
				this.messageService.add({
					severity: 'error',
					sticky: true,
					summary: 'Error',
					detail: 'Erreur lors de l\'enregistrement,',
					icon: 'pi-file'
				});
			},
			complete: () => {
				this.loading = false;
				this.fermerModal();
			}
		});
	}
}
