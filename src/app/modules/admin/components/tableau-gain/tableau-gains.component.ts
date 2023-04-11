import { Component, OnInit } from '@angular/core';
import { BilanGainService } from 'src/app/shared-elephant-bet/services/bilan-gain.service';
import { BilanGain } from 'src/app/shared-elephant-bet/models/bilan-gain';
import { PrimeNGConfig } from 'primeng/api';
import { FiltreService } from 'src/app/shared-elephant-bet/services/filtre.service';
import { finalize } from 'rxjs';
import { TotalBilanGain } from 'src/app/shared-elephant-bet/models/totalBilanGain';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateLimite } from 'src/app/shared-elephant-bet/validators/limite.validator';

@Component({
	selector: 'app-tableau-gains',
	templateUrl: './tableau-gains.component.html',
	styleUrls: ['./tableau-gains.component.scss']
})
export class TableauGainsComponent implements OnInit {
	bilanGains: BilanGain[] = [];
	limite: number = 250000;
	total: TotalBilanGain;
	limiteCourrente: number = 250000;
	loading: boolean = true;
	limiteForm: FormGroup;

	constructor(private bilanGainService: BilanGainService,
				private primeNgConfig: PrimeNGConfig,
				private filtreService: FiltreService,
				private formBuilder: FormBuilder) {
	}

	ngOnInit(): void {
		this.filtreService.gainChange.subscribe({
			next: () => {
				if (this.limite) {
					let mois = localStorage.getItem('mois');
					let annees = localStorage.getItem('annee');
					let dateDebut = localStorage.getItem('dateDebut');
					let dateFin = localStorage.getItem('dateFin');
					if (mois != null) {
						this.loading = true;
						this.bilanGainService.recupererBilanGainMois(mois, this.limite)
								.pipe(finalize(() => {
									this.filtreService.boutonProcess.next();
								})).subscribe({
							next: (bilanGains) => {
								this.bilanGains = bilanGains ? bilanGains : [];
								this.calculDesTotaux(this.bilanGains);
								this.loading = false;
							}
						});
					} else if (annees != null) {
						this.loading = true;
						this.bilanGainService.recupererBilanGainAnnee(annees, this.limite)
								.pipe(finalize(() => {
									this.filtreService.boutonProcess.next();
								})).subscribe({
							next: (bilanGains) => {
								this.bilanGains = bilanGains ? bilanGains : [];
								this.calculDesTotaux(this.bilanGains);
								this.loading = false;
							}
						});
					} else {
						if (dateDebut != null && dateFin != null) {
							this.loading = true;
							this.bilanGainService.recupererBilanGainPeriodeLimite(dateDebut, dateFin, this.limite)
									.pipe(finalize(() => {
										this.filtreService.boutonProcess.next();
									})).subscribe(
									{
										next: (bilanGains) => {
											this.bilanGains = bilanGains ? bilanGains : [];
											this.calculDesTotaux(this.bilanGains);
											this.loading = false;
										}
									});
						}
					}
				} else {
					this.filtreService.boutonProcess.next();
				}
			}
		});
		this.recupererDonneesFiltre();
		this.recupererConfig();
		this.limiteForm = this.formBuilder.group({
			limite: ['',
				[Validators.required,
					Validators.minLength(5),
					ValidateLimite]]
		});
	}

	/**
	 * Exporte les données au format Excel.
	 */
	public exportExcel(): void {
		import('xlsx').then(xlsx => {
			let Heading = [['Point de vente',
				'Nombre de gains',
				'Total des gains',
				'Nombre de gains <=' + this.limite,
				'Total des gains <=' + this.limite,
				'Nombre de gains >' + this.limite,
				'Total des gains >' + this.limite]];
			const wb = xlsx.utils.book_new();
			const ws = xlsx.utils.json_to_sheet([]);
			xlsx.utils.sheet_add_aoa(ws, Heading);
			xlsx.utils.sheet_add_json(ws, this.bilanGains, { origin: 'A2', skipHeader: true });
			xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
			xlsx.writeFile(wb, 'rapport-bilan-gain.xlsx');
		});
	}

	/**
	 * Exporte les données au format Csv.
	 */
	public exportCSV(): void {
		import('xlsx').then(xlsx => {
			let HeadingCSV = [['Point de vente',
				'Nombre de gains',
				'Total des gains',
				'Nombre de gains <=' + this.limite,
				'Total des gains <=' + this.limite,
				'Nombre de gains >' + this.limite,
				'Total des gains >' + this.limite]];
			const wb = xlsx.utils.book_new();
			const ws = xlsx.utils.json_to_sheet([]);
			xlsx.utils.sheet_add_aoa(ws, HeadingCSV);
			xlsx.utils.sheet_add_json(ws, this.bilanGains, { origin: 'A2', skipHeader: true });
			xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
			xlsx.writeFile(wb, 'rapport-bilan-gain.csv');
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
		this.recupererBilanGainLimite(annee, mois, dateDebut, dateFin);
	}

	/**
	 * Récupère la liste des gains en fonction de la période sélectionnée et de la limite d'exclusion.
	 *
	 * @param annee
	 * @param mois
	 * @param dateDebut
	 * @param dateFin
	 */
	private recupererBilanGainLimite(annee: string, mois: string, dateDebut: string, dateFin: string): void {
		this.loading = true;
		if (this.limiteCourrente) {
			this.limite = this.limiteCourrente;
			if (mois != null) {
				this.bilanGainService.recupererBilanGainMois(mois, this.limite).subscribe({
					next: (bilanGains) => {
						this.bilanGains = bilanGains ? bilanGains : [];
						this.calculDesTotaux(this.bilanGains);
						this.loading = false;
					}
				});
			} else if (annee != null) {
				this.bilanGainService.recupererBilanGainAnnee(annee, this.limite).subscribe({
					next: (bilanGains) => {
						this.bilanGains = bilanGains ? bilanGains : [];
						this.calculDesTotaux(this.bilanGains);
						this.loading = false;
					}
				});
			} else {
				if (dateDebut != null && dateFin != null) {
					this.bilanGainService.recupererBilanGainPeriodeLimite(dateDebut, dateFin, this.limite).subscribe(
							{
								next: (bilanGains) => {
									this.bilanGains = bilanGains ? bilanGains : [];
									this.calculDesTotaux(this.bilanGains);
									this.loading = false;
								}
							}
					);
				}
			}
		} else {
			this.loading = false;
		}
	}

	/**
	 * Contrôle des saisies des filtres.
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
	 * Calcule le total de nombre de gain, de nombre de gain superieur à la limite, de nombre de gain inferieur à la limite etc...
	 *
	 * @param bilans
	 */
	public calculDesTotaux(bilans: BilanGain[]): void {
		this.total = {
			nombreGainsSuperieur: 0,
			totalGainsSuperieur: 0
		};
		if (bilans.length !== 0) {
			for (let bilan of bilans) {
				this.total.nombreGainsSuperieur += bilan.nombreGainsSuperieur;
				this.total.totalGainsSuperieur += bilan.totalGainsSuperieur;
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
			noFilter: 'Pas de filtre',
		});
	}
}
