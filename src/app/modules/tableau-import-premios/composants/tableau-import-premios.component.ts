import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { FiltreService } from 'src/app/shared-elephant-bet/services/filtre.service';
import { finalize } from 'rxjs';
import { BilanPremios } from 'src/app/shared-elephant-bet/models/bilan-premios';
import { BilanPremiosService } from 'src/app/shared-elephant-bet/services/bilan-premios.service';
import { TotalBilanPremios } from 'src/app/shared-elephant-bet/models/total-bilan-premios';

@Component({
	selector: 'app-tableau-import-premios',
	templateUrl: './tableau-import-premios.component.html',
	styleUrls: ['./tableau-import-premios.component.scss']
})
export class TableauImportPremiosComponent implements OnInit {
	bilanPremios: BilanPremios[] = [];
	total: TotalBilanPremios;
	loading: boolean;

	constructor(private bilanPremiosService: BilanPremiosService,
				private primeNgConfig: PrimeNGConfig,
				private filtreService: FiltreService) {
	}

	ngOnInit(): void {
		this.filtreService.premiosChange.subscribe({
			next: () => {
				let mois = localStorage.getItem('mois');
				let annees = localStorage.getItem('annee');
				let dateDebut = localStorage.getItem('dateDebut');
				let dateFin = localStorage.getItem('dateFin');
				if (mois != null) {
					this.loading = true;
					this.bilanPremiosService.recupererBilanPremiosMois(mois).pipe(finalize(() => {
						this.filtreService.boutonProcess.next();
					})).subscribe({
						next: (bilanPremios) => {
							this.bilanPremios = bilanPremios ? bilanPremios : [];
							this.calculDesTotaux(this.bilanPremios);
							this.loading = false;
						}
					});
				} else if (annees != null) {
					this.loading = true;
					this.bilanPremiosService.recupererBilanPremiosAnnee(annees).pipe(finalize(() => {
						this.filtreService.boutonProcess.next();
					})).subscribe({
						next: (bilanPremios) => {
							this.bilanPremios = bilanPremios ? bilanPremios : [];
							this.calculDesTotaux(this.bilanPremios);
							this.loading = false;
						}
					});
				} else {
					if (dateDebut != null && dateFin != null) {
						this.loading = true;
						this.bilanPremiosService.recupererBilanPremiosPeriode(dateDebut, dateFin).pipe(finalize(() => {
							this.filtreService.boutonProcess.next();
						})).subscribe(
								{
									next: (bilanPremios) => {
										this.bilanPremios = bilanPremios ? bilanPremios : [];
										this.calculDesTotaux(this.bilanPremios);
										this.loading = false;
									}
								}
						);
					}
				}
			}
		});
		this.donneesFiltre();
		this.recupererConfig();
	}

	/**
	 * Exporte les données au format excel.
	 */
	public exportExcel(): void {
		import('xlsx').then(xlsx => {
			let HeadingEXCEL = [['Agencia',
				'Valor Total', 'Numero']];
			const wb = xlsx.utils.book_new();
			const ws = xlsx.utils.json_to_sheet([]);
			xlsx.utils.sheet_add_aoa(ws, HeadingEXCEL);
			xlsx.utils.sheet_add_json(ws, this.bilanPremios, { origin: 'A2', skipHeader: true });
			xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
			xlsx.writeFile(wb, 'rapport-bilan-premios.xlsx');
		});
	}

	/**
	 * Exporte les données au format csv.
	 */
	public exportCSV(): void {
		import('xlsx').then(xlsx => {
			let HeadingCSV = [['Agencia',
				'Valor Total', 'Numero']];
			const wb = xlsx.utils.book_new();
			const ws = xlsx.utils.json_to_sheet([]);
			xlsx.utils.sheet_add_aoa(ws, HeadingCSV);
			xlsx.utils.sheet_add_json(ws, this.bilanPremios, { origin: 'A2', skipHeader: true });
			xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
			xlsx.writeFile(wb, 'rapport-bilan-premios.csv');
		});
	}

	/**
	 * Recupère la période sélectionnée.
	 */
	private donneesFiltre(): void {
		this.loading = true;
		let mois = localStorage.getItem('mois');
		let annee = localStorage.getItem('annee');
		let dateDebut = localStorage.getItem('dateDebut');
		let dateFin = localStorage.getItem('dateFin');
		this.recupererBilanPremios(mois, annee, dateDebut, dateFin);
	}

	/**
	 * Recupère la liste du bilan premios en fonction de la période sélectionnée.
	 *
	 * @param annee
	 * @param mois
	 * @param dateDebut
	 * @param dateFin
	 */
	private recupererBilanPremios(mois: string,
								  annee: string,
								  dateDebut: string,
								  dateFin: string): void {
		if (mois != null) {
			this.bilanPremiosService.recupererBilanPremiosMois(mois).subscribe({
				next: (bilanPremios) => {
					this.bilanPremios = bilanPremios ? bilanPremios : [];
					this.calculDesTotaux(this.bilanPremios);
					this.loading = false;
				}
			});
		} else if (annee != null) {
			this.bilanPremiosService.recupererBilanPremiosAnnee(annee).subscribe({
				next: (bilanPremios) => {
					this.bilanPremios = bilanPremios ? bilanPremios : [];
					this.calculDesTotaux(this.bilanPremios);
					this.loading = false;
				}
			});
		} else {
			if (dateDebut != null && dateFin != null) {
				this.bilanPremiosService.recupererBilanPremiosPeriode(dateDebut, dateFin).subscribe(
						{
							next: (bilanPremios) => {
								this.bilanPremios = bilanPremios ? bilanPremios : [];
								this.calculDesTotaux(this.bilanPremios);
								this.loading = false;
							}
						}
				);
			}
		}
	}

	/**
	 * Contrôle les saisies des filtres.
	 */
	public controleDeSaisir(event: KeyboardEvent): void {
		if (event.code.startsWith('Arrow') ||
				event.code === 'Delete' ||
				event.code === 'Backspace' ||
				event.code === 'Tab' ||
				event.code === 'Home' ||
				event.code === 'End'
				|| event.key.match('^[0-9]$')) {
		} else {
			event.preventDefault();
		}
	}

	/**
	 * Calcule le nombre total de numero et le Total valor.
	 *
	 * @param bilanPremio: le bilan premios.
	 */
	public calculDesTotaux(bilanPremio: BilanPremios[]): void {
		this.total = {
			totalNumero: 0,
			totalValor: 0,
		};
		if (bilanPremio.length !== 0) {
			for (let bilan of bilanPremio) {
				this.total.totalValor += bilan.valeurTotal;
				this.total.totalNumero += bilan.numero;
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
			noFilter: 'Pas de filtre'
		});
	}
}
