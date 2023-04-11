import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BilanMiseService } from 'src/app/shared-elephant-bet/services/bilan-mise.service';
import { FiltreService } from 'src/app/shared-elephant-bet/services/filtre.service';
import { HttpClientModule } from '@angular/common/http';
import { BilanMise } from 'src/app/shared-elephant-bet/models/bilan-mise';
import { delay, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { TableauMisesComponent } from 'src/app/modules/tableau-mise/composents/tableau-mises.component';

describe('TableauMisesComponent', () => {
  let component: TableauMisesComponent;
  let fixture: ComponentFixture<TableauMisesComponent>;

  let bilanMise: BilanMise[]=[
    {staffCreatorGroupName:'soubre',nombreTicketSuperieur:25,totalMiseSuperieur:74},
    {staffCreatorGroupName:'soubre',nombreTicketSuperieur:25,totalMiseSuperieur:74},
    {staffCreatorGroupName:'soubre',nombreTicketSuperieur:25,totalMiseSuperieur:74},
    {staffCreatorGroupName:'soubre',nombreTicketSuperieur:25,totalMiseSuperieur:74},
    {staffCreatorGroupName:'soubre',nombreTicketSuperieur:25,totalMiseSuperieur:74}
  ];
  const bilanMiseServiceStub = jasmine.createSpyObj('BilanMiseService', ['recupererBilanMiseMois', 'recupererBilanMiseAnnee', 'recupererBilanMisePeriodeLimite']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauMisesComponent ],
      imports:[HttpClientModule,ReactiveFormsModule],
      providers:[
        { provide: FiltreService },
        { provide: BilanMiseService, useValue: bilanMiseServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(TableauMisesComponent);
    component = fixture.componentInstance;
    bilanMiseServiceStub.recupererBilanMiseMois.and.returnValue(of([]));
    bilanMiseServiceStub.recupererBilanMiseAnnee.and.returnValue(of([]));
    bilanMiseServiceStub.recupererBilanMisePeriodeLimite.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Méthode à testé  recupererBilanMiseLimite()',fakeAsync(()=>{

    localStorage.setItem('mois','10-2022')

    // GIVEN
    bilanMiseServiceStub.recupererBilanMiseMois.and.returnValue(of(bilanMise).pipe(delay(1)));
    bilanMiseServiceStub.recupererBilanMiseAnnee.and.returnValue(of(bilanMise).pipe(delay(1)));
    bilanMiseServiceStub.recupererBilanMisePeriodeLimite.and.returnValue(of(bilanMise).pipe(delay(1)));

    // WHEN
    component.recupererDonneesFiltre();

    // THEN
    expect(component.loading).toBeTrue();
    tick(1);
    expect(component.bilanMises.length).toBe(5);
    expect(bilanMiseServiceStub.recupererBilanMiseMois).toHaveBeenCalled();
    expect(component.bilanMises).toEqual(bilanMise);
  }))

  it('Méthode à testé calculDesTotaux(bilans:BilanMise[])',()=>{

    component.calculDesTotaux(bilanMise);
    expect(component.total.nombreTicketSuperieur).toEqual(125)
    expect(component.total.totalMiseSuperieur).toEqual(370)
  })
});

