import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared-elephant-bet/services/login.service';
import { TranslateService } from '@ngx-translate/core';
import { Utilisateur } from 'src/app/shared-elephant-bet/models/utilisateur';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	formBuilder: FormGroup;
	messageActif: boolean = false;
	messageErreur: string;
	spinnerActif: boolean = false;
	langues: { code: string, designation: string }[];

	constructor(private loginFoms: FormBuilder,
				private route: Router,
				private loginService: LoginService,
				private translate: TranslateService) {
	}

	ngOnInit(): void {
		this.langues = [
			{ code: 'FR', designation: 'Français' },
			{ code: 'PT', designation: 'Portugais' }
		];
		this.translate.use(this.langues[0].code.toUpperCase());
		this.formBuilder = this.loginFoms.group({
			username: ['', [Validators.required, Validators.maxLength(20)]],
			password: ['', [Validators.required, Validators.maxLength(8)]]
		});
	}

	/**
	 * Connecte un utilisateur.
	 */
	public connexion(): void {
		this.spinnerActif = true;
		let utilisateur: Utilisateur = new Utilisateur();
		utilisateur.username = this.formBuilder.get('username')?.value;
		utilisateur.password = this.formBuilder.get('password')?.value;
		if (!utilisateur.username || !utilisateur.password) {
			this.spinnerActif = false;
			this.messageErreur = 'Renseignez tous les champs';
			this.messageActif = true;
		} else {
			this.loginService.connexion(utilisateur).subscribe({
				next: (value) => {
					let jwtToken = value.token;
					this.loginService.enregistrerToken(jwtToken);
					this.route.navigate(['/main']);
				},
				error: (error) => {
					this.spinnerActif = false;
					if (error.status == '403') {
						this.messageErreur = 'Nom d\'utilisateur ou mot de passe incorrect';
					} else {
						this.messageErreur = 'Serveur indisponible';
					}
					this.messageActif = true;
				}
			});
		}
	}

	changerLangue($event: any) {
		this.translate.use($event.code.toUpperCase());
	}
}
