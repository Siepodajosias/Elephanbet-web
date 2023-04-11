import { Component, OnInit } from '@angular/core';
import { BilanMiseService } from 'src/app/shared-elephant-bet/services/bilan-mise.service';
import { BilanMise } from 'src/app/shared-elephant-bet/models/bilan-mise';
import { PrimeNGConfig } from 'primeng/api';
import { FiltreService } from 'src/app/shared-elephant-bet/services/filtre.service';
import { finalize } from 'rxjs';
import { TotalBilanMise } from 'src/app/shared-elephant-bet/models/totalBilanMise';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateLimite } from 'src/app/shared-elephant-bet/validators/limite.validator';

@Component({
	selector: 'app-tableau-mises',
	templateUrl: './tableau-mises.component.html',
	styleUrls: ['./tableau-mises.component.scss']
})
export class TableauMisesComponent implements OnInit {
	bilanMises: BilanMise[] = [];
	total: TotalBilanMise;
	limite: number = 50000;
	limiteCourrente: number = 50000;
	loading: boolean = true;
	limiteForm: FormGroup;

	constructor(private bilanMiseService: BilanMiseService,
				private primeNgConfig: PrimeNGConfig,
				private filtreService: FiltreService,
				private formBuilder: FormBuilder) {
	}

	ngOnInit(): void {
		this.filtreService.miseChange.subscribe({
			next: () => {
				let mois = localStorage.getItem('mois');
				let annees = localStorage.getItem('annee');
				let dateDebut = localStorage.getItem('dateDebut');
				let dateFin = localStorage.getItem('dateFin');
				if (mois != null) {
					this.loading = true;
					this.bilanMiseService.recupererBilanMiseMois(mois, this.limite)
							.pipe(finalize(() => {
								this.filtreService.boutonProcess.next();
							})).subscribe({
						next: (bilanMises) => {
							this.bilanMises = bilanMises ? bilanMises : [];
							this.calculDesTotaux(this.bilanMises);
							this.loading = false;
						}
					});
				} else if (annees != null) {
					this.loading = true;
					this.bilanMiseService.recupererBilanMiseAnnee(annees, this.limite)
							.pipe(finalize(() => {
								this.filtreService.boutonProcess.next();
							})).subscribe({
						next: (bilanMises) => {
							this.bilanMises = bilanMises ? bilanMises : [];
							this.calculDesTotaux(this.bilanMises);
							this.loading = false;
						}
					});
				} else {
					if (dateDebut != null && dateFin != null) {
						this.loading = true;
						this.bilanMiseService.recupererBilanMisePeriodeLimite(dateDebut, dateFin, this.limite)
								.pipe(finalize(() => {
									this.filtreService.boutonProcess.next();
								})).subscribe(
								{
									next: (bilanMises) => {
										this.bilanMises = bilanMises ? bilanMises : [];
										this.calculDesTotaux(this.bilanMises);
										this.loading = false;
									}
								}
						);
					}
				}
			}
		});
		this.recupererDonneesFiltre();
		this.recupererConfig();
		this.limiteForm = this.formBuilder.group({
			limite: ['', [Validators.required, Validators.minLength(5), ValidateLimite]]
		});
	}

	/**
	 * Exporte les données au format Excel.
	 */
	public exportExcel(): void {
		import('xlsx').then(xlsx => {
			let HeadingEXCEL = [['Point de vente',
				'Nombre de tickets',
				'Total des mises',
				'Nombre de Tickets <=' + this.limite,
				'Total des mises <=' + this.limite,
				'Nombre de tickets >' + this.limite,
				'Total des mises >' + this.limite]];
			const wb = xlsx.utils.book_new();
			const ws = xlsx.utils.json_to_sheet([]);
			xlsx.utils.sheet_add_aoa(ws, HeadingEXCEL);
			xlsx.utils.sheet_add_json(ws, this.bilanMises, { origin: 'A2', skipHeader: true });
			xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
			xlsx.writeFile(wb, 'rapport-bilan-mise.xlsx');
		});
	}

	/**
	 * Exporte les données au format Csv.
	 */
	public exportCSV(): void {
		import('xlsx').then(xlsx => {
			let HeadingCSV = [['Point de vente',
				'Nombre de tickets',
				'Total des mises',
				'Nombre de Tickets <=' + this.limite,
				'Total des mises <=' + this.limite,
				'Nombre de tickets >' + this.limite,
				'Total des mises >' + this.limite]];
			const wb = xlsx.utils.book_new();
			const ws = xlsx.utils.json_to_sheet([]);
			xlsx.utils.sheet_add_aoa(ws, HeadingCSV);
			xlsx.utils.sheet_add_json(ws, this.bilanMises, { origin: 'A2', skipHeader: true });
			xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
			xlsx.writeFile(wb, 'rapport-bilan-mise.csv');
		});
	}

	/**
	 * Récupère le mois, l'année, la date debut et fin dans le locale storage.
	 */
	public recupererDonneesFiltre(): void {
		let mois = localStorage.getItem('mois');
		let annee = localStorage.getItem('annee');
		let dateDebut = localStorage.getItem('dateDebut');
		let dateFin = localStorage.getItem('dateFin');
		this.recupererBilanMiseLimite(annee, mois, dateDebut, dateFin);
	}

	/**
	 * Récupère la liste de tous les mises en fonction de la période sélectionnée et de la limite d'exclusion.
	 *
	 * @param annee
	 * @param mois
	 * @param dateDebut
	 * @param dateFin
	 */
	private recupererBilanMiseLimite(annee: string, mois: string, dateDebut: string, dateFin: string): void {
		this.loading = true;
		if (this.limiteCourrente) {
			this.limite = this.limiteCourrente;
			if (mois != null) {
				this.bilanMiseService.recupererBilanMiseMois(mois, this.limite).subscribe({
					next: (bilanMises) => {
						this.bilanMises = bilanMises ? bilanMises : [];
						this.calculDesTotaux(this.bilanMises);
						this.loading = false;
					}
				});
			} else if (annee != null) {
				this.bilanMiseService.recupererBilanMiseAnnee(annee, this.limite).subscribe({
					next: (bilanMises) => {
						this.bilanMises = bilanMises ? bilanMises : [];
						this.calculDesTotaux(this.bilanMises);
						this.loading = false;
					}
				});
			} else {
				if (dateDebut != null && dateFin != null) {
					this.bilanMiseService.recupererBilanMisePeriodeLimite(dateDebut, dateFin, this.limite).subscribe(
							{
								next: (bilanMises) => {
									this.bilanMises = bilanMises ? bilanMises : [];
									this.calculDesTotaux(this.bilanMises);
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
	 * Contrôle les saisies des filtres.
	 */
	public controleDeSaisir(event: KeyboardEvent): void {
		if (event.code.startsWith('Arrow') ||
				event.code === 'Delete' ||
				event.code === 'Backspace' ||
				event.code === 'Tab' ||
				event.code === 'Home' ||
				event.code === 'End' ||
				event.key.match('^[0-9]$')) {
		}
		else {
			event.preventDefault();
		}
	}

	/**
	 * Calcule le total de nombre de ticket, de nombre de ticket superieur à la limite, de nombre de ticket inferieur à la limite etc...
	 *
	 * @param bilans
	 */
	public calculDesTotaux(bilans: BilanMise[]): void {
		this.total = {
			nombreTicketSuperieur: 0,
			totalMiseSuperieur: 0,
		};
		if (bilans.length !== 0) {
			for (let bilan of bilans) {
				this.total.nombreTicketSuperieur += bilan.nombreTicketSuperieur;
				this.total.totalMiseSuperieur += bilan.totalMiseSuperieur;
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
