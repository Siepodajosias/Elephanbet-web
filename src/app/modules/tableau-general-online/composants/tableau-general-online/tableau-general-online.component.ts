import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { BilanJeuService } from 'src/app/shared-elephant-bet/services/bilan-jeu.service';
import { BilanJeu } from 'src/app/shared-elephant-bet/models/bilan-jeu';
import { FiltreService } from 'src/app/shared-elephant-bet/services/filtre.service';
import { finalize } from 'rxjs';
import { TotalBilanGeneralOnline } from 'src/app/shared-elephant-bet/models/total-bilan-general-online';

@Component({
	selector: 'app-tableau-general-online',
	templateUrl: './tableau-general-online.component.html',
	styleUrls: ['./tableau-general-online.component.scss']
})
export class TableauGeneralOnlineComponent implements OnInit {
	bilanGeneralOnlines: BilanJeu[] = [];
	loading: boolean;
	total: TotalBilanGeneralOnline;

	constructor(private primeNgConfig: PrimeNGConfig,
				private bilanJeuSrvice: BilanJeuService,
				private filtreService: FiltreService) {
	}

	ngOnInit(): void {
		this.filtreService.generalOnlineChange.subscribe({
			next: () => {
				let mois = localStorage.getItem('mois');
				let annees = localStorage.getItem('annee');
				let dateDebut = localStorage.getItem('dateDebut');
				let dateFin = localStorage.getItem('dateFin');
				if (mois != null) {
					this.loading = true;
					this.bilanJeuSrvice.recupererBilanJeuMois(mois)
							.pipe(finalize(() => {
								this.filtreService.boutonProcess.next();
							})).subscribe({
						next: (bilanJeux) => {
							this.bilanGeneralOnlines = bilanJeux ? bilanJeux : [];
							this.calculDesTotaux(this.bilanGeneralOnlines);
							this.loading = false;
						}
					});
				} else if (annees != null) {
					this.loading = true;
					this.bilanJeuSrvice.recupererBilanJeuAnnee(annees)
							.pipe(finalize(() => {
								this.filtreService.boutonProcess.next();
							})).subscribe({
						next: (bilanJeux) => {
							this.bilanGeneralOnlines = bilanJeux ? bilanJeux : [];
							this.calculDesTotaux(this.bilanGeneralOnlines);
							this.loading = false;
						}
					});
				} else {
					if (dateDebut != null && dateFin != null) {
						this.loading = true;
						this.bilanJeuSrvice.recupererBilanJeuPeriode(dateDebut, dateFin)
								.pipe(finalize(() => {
									this.filtreService.boutonProcess.next();
								})).subscribe({
							next: (bilanJeux) => {
								this.bilanGeneralOnlines = bilanJeux ? bilanJeux : [];
								this.calculDesTotaux(this.bilanGeneralOnlines);
								this.loading = false;
							}
						});
					}
				}
			}
		});
		this.recupererConfig();
		this.recupererDonneesFiltre();
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
		this.recupererBilanGeneralOnline(annee, mois, dateDebut, dateFin);
	}

	/**
	 * Recupère la liste du bilan général online en fonction de la période sélectionnée.
	 *
	 * @param annee
	 * @param mois
	 * @param dateDebut
	 * @param dateFin
	 */
	private recupererBilanGeneralOnline(annee: string, mois: string, dateDebut: string, dateFin: string): void {
		this.loading = true;
		if (mois != null) {
			this.bilanJeuSrvice.recupererBilanJeuMois(mois).subscribe({
				next: (bilanJeux) => {
					this.bilanGeneralOnlines = bilanJeux ? bilanJeux : [];
					this.calculDesTotaux(this.bilanGeneralOnlines);
					this.loading = false;
				}
			});
		} else if (annee != null) {
			this.bilanJeuSrvice.recupererBilanJeuAnnee(annee).subscribe({
				next: (bilanJeux) => {
					this.bilanGeneralOnlines = bilanJeux ? bilanJeux : [];
					this.calculDesTotaux(this.bilanGeneralOnlines);
					this.loading = false;
				}
			});
		} else {
			if (dateDebut != null && dateFin != null) {
				this.bilanJeuSrvice.recupererBilanJeuPeriode(dateDebut, dateFin).subscribe({
					next: (bilanJeux) => {
						this.bilanGeneralOnlines = bilanJeux ? bilanJeux : [];
						this.calculDesTotaux(this.bilanGeneralOnlines);
						this.loading = false;
					}
				});
			}
		}
	}

	/**
	 * Exporte les données au format excel.
	 */
	public exportExcel(): void {
		import('xlsx').then(xlsx => {
			let HeadingEXCEL = [[
				'Jeu',
				'Nombre de jeux',
				'Volume de jeux',
				'Nombre de gains',
				'Volume des gains',
				'Balance',
				'Nb Gains > 250 000',
				'Nb Gains < 250 000',
				'Volume Gains > 250 000',
				'Volume Gains < 250 000']];
			const wb = xlsx.utils.book_new();
			const ws = xlsx.utils.json_to_sheet([]);
			xlsx.utils.sheet_add_aoa(ws, HeadingEXCEL);
			xlsx.utils.sheet_add_json(ws, this.bilanGeneralOnlines, { origin: 'A2', skipHeader: true });
			xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
			xlsx.writeFile(wb, 'rapport-bilan-général-online.xlsx');
		});
	}

	/**
	 * Exporte les données au format csv.
	 */
	public exportCSV(): void {
		import('xlsx').then(xlsx => {
			let HeadingCSV = [[
				'Jeu',
				'Nombre de jeux',
				'Volume de jeux',
				'Nombre de gains',
				'Volume des gains',
				'Balance',
				'Nb Gains > 250 000',
				'Nb Gains < 250 000',
				'Volume Gains > 250 000',
				'Volume Gains < 250 000']];
			const wb = xlsx.utils.book_new();
			const ws = xlsx.utils.json_to_sheet([]);
			xlsx.utils.sheet_add_aoa(ws, HeadingCSV);
			xlsx.utils.sheet_add_json(ws, this.bilanGeneralOnlines, { origin: 'A2', skipHeader: true });
			xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
			xlsx.writeFile(wb, 'rapport-bilan-général-online.csv');
		});
	}

	/**
	 * Calcule le total de nombre de jeu, de nombre de gains, de nombre de volume de jeu etc...
	 *
	 * @param bilanjeu
	 * @constructor
	 */
	public calculDesTotaux(bilanjeu: BilanJeu[]): void {
		this.total = {
			totalNombreJeu: 0,
			totalVolumeJeu: 0,
			totalNombreGains: 0,
			totalVumeGains: 0,
			totatBance: 0,
			totalNombreGainsSuperieurLimite: 0,
			totalNombreGainsInferieurLimite: 0,
			totalVolumeGainsInferieurLimite: 0,
			totalVolumeGainsSuperieurLimite: 0
		};
		if (bilanjeu.length !== 0) {
			for (let bilan of bilanjeu) {
				this.total.totalNombreJeu += bilan.nombreJeu;
				this.total.totalVolumeJeu += bilan.volumeJeu;
				this.total.totalNombreGains += bilan.nombreGains;
				this.total.totalVumeGains += bilan.volumeGains;
				this.total.totatBance += bilan.balance;
				this.total.totalNombreGainsSuperieurLimite += bilan.nombreGainsSuperieurLimite;
				this.total.totalNombreGainsInferieurLimite += bilan.nombreGainsInferieurLimite;
				this.total.totalVolumeGainsInferieurLimite += bilan.volumeGainsInferieurLimite;
				this.total.totalVolumeGainsSuperieurLimite += bilan.volumeGainsSuperieurLimite;
			}
		}
	}

	/**
	 * Traduit les filtres en français.
	 */
	public recupererConfig(): void {
		this.primeNgConfig.setTranslation({
			startsWith: 'Commence par',
			contains: 'Contient',
			notContains: 'Ne contient pas',
			endsWith: 'Fini par',
			equals: 'Egale à',
			notEquals: 'Différent de',
			noFilter: 'Pas de filtre',
		});
	}
}
