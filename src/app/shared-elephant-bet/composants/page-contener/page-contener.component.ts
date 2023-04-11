import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltreService } from 'src/app/shared-elephant-bet/services/filtre.service';
import { PrimeNGConfig } from 'primeng/api';
import { NavigationService } from 'src/app/shared-elephant-bet/services/navigation.service';

@Component({
	selector: 'app-page-contener',
	templateUrl: './page-contener.component.html',
	styleUrls: ['./page-contener.component.scss']
})
export class PageContenerComponent implements OnInit {
	loading: boolean = false;
	aujourdhui = new Date();
	periodes: Date[];
	mois: any;
	annees: any;
	@Input() collapsed = true;
	@Input() screenWidth = 0;
	dateFuture = new Date();

	constructor(private route: Router,
				private filtreService: FiltreService,
				private primeNgConfig: PrimeNGConfig,
				private navigationService: NavigationService) {
	}

	ngOnInit(): void {
		const joutDebut = new Date();
		joutDebut.setDate(this.aujourdhui.getDate() - 7);
		this.periodes = [joutDebut, this.aujourdhui];
		this.formaterPeriode();
		this.recuperertConfig();
	}

	public recupererClassBody(): string {
		let styleclass = '';
		if (this.collapsed && this.screenWidth > 768) {
			styleclass = 'body-trimmed';
		} else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
			styleclass = 'body-md-screen';
		}
		return styleclass;
	}

	/**
	 * Formate la période sélectionnée.
	 */
	public formaterPeriode(): void {
		let moisDebut = this.periodes[0].getMonth() + 1;
		let dDebut = this.periodes[0].getDate();
		let moisFin = this.periodes[1].getMonth() + 1;
		let dFin = this.periodes[1].getDate();

		//date de debut
		this.dateDebut(moisDebut, dDebut);

		//date de fin
		this.dateFin(moisFin, dFin);
	}

	/**
	 * Date de debut.
	 *
	 * @param moisDebut
	 * @param dDebut
	 */
	public dateDebut(moisDebut: any, dDebut: any): void {
		if (moisDebut < 10 && dDebut < 10) {
			let dateDebut = this.periodes[0].getFullYear() + '-0' + moisDebut + '-0' + dDebut;
			this.enregistrerDateDebut(dateDebut);
		} else if (moisDebut < 10 && dDebut > 10) {
			let dateDebut = this.periodes[0].getFullYear() + '-0' + moisDebut + '-' + dDebut;
			this.enregistrerDateDebut(dateDebut);
		} else if (moisDebut > 10 && dDebut < 10) {
			let dateDebut = this.periodes[0].getFullYear() + '-' + moisDebut + '-0' + dDebut;
			this.enregistrerDateDebut(dateDebut);
		} else if (moisDebut == 10 && dDebut < 10) {
			let dateDebut = this.periodes[0].getFullYear() + '-' + moisDebut + '-0' + dDebut;
			this.enregistrerDateDebut(dateDebut);
		} else if (dDebut == 10 && moisDebut < 10) {
			let dateDebut = this.periodes[0].getFullYear() + '-0' + moisDebut + '-' + dDebut;
			this.enregistrerDateDebut(dateDebut);
		} else {
			let dateDebut = this.periodes[0].getFullYear() + '-' + moisDebut + '-' + dDebut;
			this.enregistrerDateDebut(dateDebut);
		}
	}

	/**
	 * Date de fin.
	 *
	 * @param moisFin
	 * @param dFin
	 */
	public dateFin(moisFin: any, dFin: any): void {
		if (moisFin < 10 && dFin < 10) {
			let dateFin = this.periodes[1].getFullYear() + '-0' + moisFin + '-0' + dFin;
			this.enregistrerDateFin(dateFin);
		} else if (moisFin < 10 && dFin > 10) {
			let dateFin = this.periodes[1].getFullYear() + '-0' + moisFin + '-' + dFin;
			this.enregistrerDateFin(dateFin);
		} else if (moisFin > 10 && dFin < 10) {
			let dateFin = this.periodes[1].getFullYear() + '-' + moisFin + '-0' + dFin;
			this.enregistrerDateFin(dateFin);
		} else if (moisFin == 10 && dFin < 10) {
			let dateFin = this.periodes[1].getFullYear() + '-' + moisFin + '-0' + dFin;
			this.enregistrerDateFin(dateFin);
		} else if (dFin == 10 && moisFin < 10) {
			let dateFin = this.periodes[1].getFullYear() + '-0' + moisFin + '-' + dFin;
			this.enregistrerDateFin(dateFin);
		} else {
			let dateFin = this.periodes[1].getFullYear() + '-' + moisFin + '-' + dFin;
			this.enregistrerDateFin(dateFin);
		}
	}

	/**
	 * Stocke la date de début dans le locale storage.
	 *
	 * @param dateDebut: date de début à stocker.
	 */
	public enregistrerDateDebut(dateDebut: string): void {
		localStorage.setItem('dateDebut', dateDebut);
		localStorage.removeItem('annee');
		localStorage.removeItem('mois');
	}

	/**
	 * Stocke la date de fin dans le locale storage.
	 *
	 * @param dateFin: date de fin à stocker.
	 */
	public enregistrerDateFin(dateFin: string): void {
		localStorage.setItem('dateFin', dateFin);
		localStorage.removeItem('annee');
		localStorage.removeItem('mois');
	}

	/**
	 * Valide les filtres sélectionnées.
	 */
	public validerfiltre(): void {
		this.loading = true;
		if (this.navigationService.isBilanGeneral()) {
			this.filtreService.generalChange.next();
			this.filtreService.boutonProcess.subscribe(() => {
				this.loading = false;
			});
		} else if (this.navigationService.isBilanGain()) {
			this.filtreService.gainChange.next();
			this.filtreService.boutonProcess.subscribe(() => {
				this.loading = false;
			});
		} else if (this.navigationService.isTableauGeneralOnline()) {
			this.filtreService.generalOnlineChange.next();
			this.filtreService.boutonProcess.subscribe(() => {
				this.loading = false;
			});
		} else if (this.navigationService.isTableauPremios()) {
			this.filtreService.premiosChange.next();
			this.filtreService.boutonProcess.subscribe(() => {
				this.loading = false;
			});
		} else if (this.navigationService.isTableauMise()) {
			this.filtreService.miseChange.next();
			this.filtreService.boutonProcess.subscribe(() => {
				this.loading = false;
			});
		} else {
			this.loading = false;
		}
	}

	/**
	 * Filtre période.
	 */
	onSelectionPeriode(): void {
		this.mois = '';
		this.annees = '';
		if (this.periodes[0] != null && this.periodes[1] != null) {
			this.formaterPeriode();
		}
	}

	/**
	 * Filtre mois.
	 */
	public onSelectionMois(): void {
		this.periodes = [];
		this.annees = '';
		let moisNombre = parseInt(this.mois.getMonth()) + 1;
		let moisFormat: string = '';
		if (moisNombre < 10) {
			moisFormat = this.mois.getFullYear() + '-0' + moisNombre;
			localStorage.setItem('mois', moisFormat);
			localStorage.removeItem('annee');
			localStorage.removeItem('dateDebut');
			localStorage.removeItem('dateFin');
		} else {
			moisFormat = this.mois.getFullYear() + '-' + moisNombre;
			localStorage.setItem('mois', moisFormat);
			localStorage.removeItem('annee');
			localStorage.removeItem('dateDebut');
			localStorage.removeItem('dateFin');
		}
	}

	/**
	 * Filtre année.
	 */
	public onSelectionMAnnee(): void {
		this.periodes = [];
		this.mois = '';
		let annee = this.annees.getFullYear();
		localStorage.setItem('annee', annee);
		localStorage.removeItem('mois');
		localStorage.removeItem('dateDebut');
		localStorage.removeItem('dateFin');
	}

	/**
	 *
	 */
	public isFiltreActif(): boolean {
		return !(this.navigationService.isUtilisateur() ||
				this.navigationService.isGroupeDate() ||
				this.navigationService.isLimiteTicket() ||
				this.navigationService.isLimiteGain() ||
				this.navigationService.isImportOnline() ||
				this.navigationService.isImportPremios());
	}

	/**
	 * Traduit des filtres en français.
	 */
	public recuperertConfig(): void {
		this.primeNgConfig.setTranslation({
			dayNames: ['Dimanche',
				'Lundi',
				'Mardi',
				'Mercredi',
				'Jeudi',
				'Vendredi',
				'Samedi'],
			dayNamesShort: ['Dim.',
				'Lun.',
				'Mar.',
				'Mer.',
				'Jeu.',
				'Ven.',
				'Sam.'],
			dayNamesMin: ['Di',
				'Lu',
				'Ma',
				'Me',
				'Je',
				'Ve',
				'Sa'],
			monthNames: ['Janvier',
				'Fevrier',
				'Mars',
				'Avril',
				'Mai',
				'Juin',
				'Juillet',
				'Août',
				'Septembre',
				'Octobre',
				'Novembre',
				'Decembre'],
			monthNamesShort: ['Janv.',
				'Fevr.',
				'Mars',
				'Avri.',
				'Mai',
				'Juin',
				'Juil.',
				'Août',
				'Sept.',
				'Octo.',
				'Novem.',
				'Decem.']
		});
	}
}
