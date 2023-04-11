import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { BilanGeneralService } from 'src/app/shared-elephant-bet/services/bilan-general.service';
import { FiltreService } from 'src/app/shared-elephant-bet/services/filtre.service';
import { BilanGeneral } from 'src/app/shared-elephant-bet/models/bilan-general';
import { finalize } from 'rxjs';
import { TotalBilanGeneral } from 'src/app/shared-elephant-bet/models/totalBilanGeneral';


@Component({
	selector: 'app-tableau-general',
	templateUrl: './tableau-general.component.html',
	styleUrls: ['./tableau-general.component.scss']
})
export class TableauGeneralComponent implements OnInit {
	bilanGenerals: BilanGeneral[] = [];
	loading: boolean = true;
	total: TotalBilanGeneral;

	constructor(private bilanService: BilanGeneralService,
				private primeNgConfig: PrimeNGConfig,
				private filtreService: FiltreService) {
	}

	ngOnInit(): void {
		this.filtreService.generalChange.subscribe({
			next: () => {
				let mois = localStorage.getItem('mois');
				let annees = localStorage.getItem('annee');
				let dateDebut = localStorage.getItem('dateDebut');
				let dateFin = localStorage.getItem('dateFin');
				if (mois != null) {
					this.loading = true;
					this.bilanService.selectionBilanGeneralMois(mois)
							.pipe(finalize(() => {
								this.filtreService.boutonProcess.next();
							})).subscribe({
						next: (bilanGenerals) => {
							this.bilanGenerals = bilanGenerals ? bilanGenerals : [];
							this.calculDesTotaux(this.bilanGenerals);
							this.loading = false;
						}
					});
				} else if (annees != null) {
					this.loading = true;
					this.bilanService.selectionBilanGeneralAnnee(annees)
							.pipe(finalize(() => {
								this.filtreService.boutonProcess.next();
							})).subscribe({
						next: (bilanGenerals) => {
							this.bilanGenerals = bilanGenerals ? bilanGenerals : [];
							this.calculDesTotaux(this.bilanGenerals);
							this.loading = false;
						}
					});
				} else {
					if (dateDebut != null && dateFin != null) {
						this.loading = true;
						this.bilanService.selectionBilanGeneralPeriode(dateDebut, dateFin)
								.pipe(finalize(() => {
									this.filtreService.boutonProcess.next();
								})).subscribe({
							next: (bilanGenerals) => {
								this.bilanGenerals = bilanGenerals ? bilanGenerals : [];
								this.calculDesTotaux(this.bilanGenerals);
								this.loading = false;
							}
						});
					}
				}
			}
		});
		this.recupererDonneesFiltre();
		this.recupererConfig();
	}

	/**
	 * Exporte les données au format excel.
	 */
	public exportExcel(): void {
		import('xlsx').then(xlsx => {
			let HeadingEXCEL = [['Point de vente',
				'Nombre Tickets vendus',
				'Valeur des tickets vendus',
				'Nombre Tickets gagnants',
				'Total des gains',
				'Nombre de Tickets pending']];
			const wb = xlsx.utils.book_new();
			const ws = xlsx.utils.json_to_sheet([]);
			xlsx.utils.sheet_add_aoa(ws, HeadingEXCEL);
			xlsx.utils.sheet_add_json(ws, this.bilanGenerals, { origin: 'A2', skipHeader: true });
			xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
			xlsx.writeFile(wb, 'rapport-bilan-général.xlsx');
		});
	}

	/**
	 * Exporte les données au format csv.
	 */
	public exportCSV(): void {
		import('xlsx').then(xlsx => {
			let HeadingCSV = [['Point de vente',
				'Nombre Tickets vendus',
				'Valeur des tickets vendus',
				'Nombre Tickets gagnants',
				'Total des gains',
				'Nombre de Tickets pending']];
			const wb = xlsx.utils.book_new();
			const ws = xlsx.utils.json_to_sheet([]);
			xlsx.utils.sheet_add_aoa(ws, HeadingCSV);
			xlsx.utils.sheet_add_json(ws, this.bilanGenerals, { origin: 'A2', skipHeader: true });
			xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
			xlsx.writeFile(wb, 'rapport-bilan-général.csv');
		});
	}

	/**
	 * Récupère le mois, l'année, la date debut et fin dans le locale storage.
	 */
	public recupererDonneesFiltre(): void {
		this.loading = true;
		let mois = localStorage.getItem('mois');
		let annee = localStorage.getItem('annee');
		let dateDebut = localStorage.getItem('dateDebut');
		let dateFin = localStorage.getItem('dateFin');
		this.recupererBilanGeneral(annee, mois, dateDebut, dateFin);
	}

	/**
	 * Récupère la liste du bilan général en fonction de la période sélectionnée.
	 *
	 * @param annee
	 * @param mois
	 * @param dateDebut
	 * @param dateFin
	 */
	private recupererBilanGeneral(annee: string, mois: string, dateDebut: string, dateFin: string): void {
		this.loading = true;
		if (mois != null) {
			this.bilanService.selectionBilanGeneralMois(mois).subscribe({
				next: (bilanGenerals) => {
					this.bilanGenerals = bilanGenerals ? bilanGenerals : [];
					this.calculDesTotaux(this.bilanGenerals);
					this.loading = false;
				}
			});
		} else if (annee != null) {
			this.bilanService.selectionBilanGeneralAnnee(annee).subscribe({
				next: (bilanGenerals) => {
					this.bilanGenerals = bilanGenerals ? bilanGenerals : [];
					this.calculDesTotaux(this.bilanGenerals);
					this.loading = false;
				}
			});
		} else {
			if (dateDebut != null && dateFin != null) {
				this.bilanService.selectionBilanGeneralPeriode(dateDebut, dateFin).subscribe({
					next: (bilanGenerals) => {
						this.bilanGenerals = bilanGenerals ? bilanGenerals : [];
						this.calculDesTotaux(this.bilanGenerals);
						this.loading = false;
					}
				});
			}
		}
	}

	/**
	 * Contrôle des saisies des filtres
	 */
	public controleDeSaisir(event: KeyboardEvent): void {
		if (event.code.startsWith('Arrow') ||
				event.code === 'Delete' ||
				event.code === 'Backspace' ||
				event.code === 'Tab' ||
				event.code === 'Home' ||
				event.code === 'End' ||
				event.key.match('^[0-9]$')) {
		} else {
			event.preventDefault();
		}
	}

	/**
	 * Calcule le total de nombre de ticket vendu, de nombre de ticket gagnant, de nombre de ticket pending etc...
	 *
	 * @param bilans
	 * @constructor
	 */
	public calculDesTotaux(bilans: BilanGeneral[]): void {
		this.total = {
			totalNombreTicketVendu: 0,
			totalNombreTicketGagnant: 0,
			totalNombreTicketPending: 0,
			totalGains: 0,
			totalMise: 0,
			totalBalance: 0
		};
		if (bilans.length !== 0) {
			for (let bilan of bilans) {
				this.total.totalNombreTicketGagnant += bilan.nombreTicketGagnant;
				this.total.totalNombreTicketPending += bilan.nombreTicketPending;
				this.total.totalNombreTicketVendu += bilan.nombreTicketVendu;
				this.total.totalGains += bilan.totalGains;
				this.total.totalMise += bilan.totalMise;
				this.total.totalBalance += bilan.balance;
			}
		}
	}

	/**
	 * Traduit des filtres en français.
	 */
	public recupererConfig(): void {
		this.primeNgConfig.setTranslation({
			startsWith: 'Commence par',
			contains: 'Contient',
			notContains: 'Ne contient pas',
			endsWith: 'Fini par',
			equals: 'Egale à',
			notEquals: 'Différent de',
			noFilter: 'Pas de filtre'
		});
	}
}
