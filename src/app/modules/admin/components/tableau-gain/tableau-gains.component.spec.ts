import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TableauGainsComponent } from 'src/app/modules/admin/components/tableau-gain/tableau-gains.component';
import { BilanGainService } from 'src/app/shared-elephant-bet/services/bilan-gain.service';
import { FiltreService } from 'src/app/shared-elephant-bet/services/filtre.service';
import { HttpClientModule } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { BilanGain } from 'src/app/shared-elephant-bet/models/bilan-gain';
import { ReactiveFormsModule } from '@angular/forms';

describe('TableauGainsComponent', () => {
	let component: TableauGainsComponent;
	let fixture: ComponentFixture<TableauGainsComponent>;

	let bilanGain: BilanGain[] = [
		{ staffCreatorGroupName: 'soubre', nombreGainsSuperieur: 25, totalGainsSuperieur: 78 },
		{ staffCreatorGroupName: 'soubre', nombreGainsSuperieur: 25, totalGainsSuperieur: 78 },
		{ staffCreatorGroupName: 'soubre', nombreGainsSuperieur: 25, totalGainsSuperieur: 78 },
		{ staffCreatorGroupName: 'soubre', nombreGainsSuperieur: 25, totalGainsSuperieur: 78 },
		{ staffCreatorGroupName: 'soubre', nombreGainsSuperieur: 25, totalGainsSuperieur: 78 }
	];
	const bilanGainServiceStub = jasmine.createSpyObj('BilanGainService', ['recupererBilanGainMois', 'recupererBilanGainAnnee', 'recupererBilanGainPeriodeLimite']);

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TableauGainsComponent],
			imports: [HttpClientModule, ReactiveFormsModule],
			providers: [
				{ provide: FiltreService },
				{ provide: BilanGainService, useValue: bilanGainServiceStub }]
		})
				.compileComponents();

		fixture = TestBed.createComponent(TableauGainsComponent);
		component = fixture.componentInstance;
		bilanGainServiceStub.recupererBilanGainMois.and.returnValue(of([]));
		bilanGainServiceStub.recupererBilanGainAnnee.and.returnValue(of([]));
		bilanGainServiceStub.recupererBilanGainPeriodeLimite.and.returnValue(of([]));
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Méthode à testé  recupererBilanGainLimite()', fakeAsync(() => {

		localStorage.setItem('mois', '10-2022');

		// GIVEN
		bilanGainServiceStub.recupererBilanGainMois.and.returnValue(of(bilanGain).pipe(delay(1)));
		bilanGainServiceStub.recupererBilanGainAnnee.and.returnValue(of(bilanGain).pipe(delay(1)));
		bilanGainServiceStub.recupererBilanGainPeriodeLimite.and.returnValue(of(bilanGain).pipe(delay(1)));

		// WHEN
		component.recupererDonneesFiltre();

		// THEN
		expect(component.loading).toBeTrue();
		tick(1);
		expect(component.bilanGains.length).toBe(5);
		expect(bilanGainServiceStub.recupererBilanGainMois).toHaveBeenCalled();
		expect(component.bilanGains).toEqual(bilanGain);
	}));

	it('calculDesTotaux(bilans:BilanGain[] )', () => {

		component.calculDesTotaux(bilanGain);
		expect(component.total.nombreGainsSuperieur).toEqual(125);
		expect(component.total.totalGainsSuperieur).toEqual(390);

	});
});

