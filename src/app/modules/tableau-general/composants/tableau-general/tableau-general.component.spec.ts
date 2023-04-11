import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BilanGeneralService } from 'src/app/shared-elephant-bet/services/bilan-general.service';
import { FiltreService } from 'src/app/shared-elephant-bet/services/filtre.service';
import { HttpClientModule } from '@angular/common/http';
import { BilanGeneral } from 'src/app/shared-elephant-bet/models/bilan-general';
import { delay, of } from 'rxjs';
import { TableauGeneralComponent } from 'src/app/modules/tableau-general/composants/tableau-general/tableau-general.component';

describe('TableauGeneralComponent', () => {
  let component: TableauGeneralComponent;
  let fixture: ComponentFixture<TableauGeneralComponent>;

  let bilan: BilanGeneral[]=[
    {dateCreation:'2022-12-5',staffCreatorGroupName:'soubre',nombreTicketVendu:12,nombreTicketGagnant:25,nombreTicketPending:87,balance:78,totalGains:74,totalMise:78},
    {dateCreation:'2022-12-5',staffCreatorGroupName:'soubre',nombreTicketVendu:12,nombreTicketGagnant:25,nombreTicketPending:87,balance:78,totalGains:74,totalMise:78},
    {dateCreation:'2022-12-5',staffCreatorGroupName:'soubre',nombreTicketVendu:12,nombreTicketGagnant:25,nombreTicketPending:87,balance:78,totalGains:74,totalMise:78},
    {dateCreation:'2022-12-5',staffCreatorGroupName:'soubre',nombreTicketVendu:12,nombreTicketGagnant:25,nombreTicketPending:87,balance:78,totalGains:74,totalMise:78},
    {dateCreation:'2022-12-5',staffCreatorGroupName:'soubre',nombreTicketVendu:12,nombreTicketGagnant:25,nombreTicketPending:87,balance:78,totalGains:74,totalMise:78}
  ];

  const bilanGeneralServiceStub = jasmine.createSpyObj('BilanGeneralService', ['selectionBilanGeneralMois', 'selectionBilanGeneralAnnee', 'selectionBilanGeneralPeriode']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauGeneralComponent ],
      imports:[HttpClientModule],
      providers:[
        { provide: FiltreService },
        { provide: BilanGeneralService, useValue: bilanGeneralServiceStub }]
    })
            .compileComponents();

    fixture = TestBed.createComponent(TableauGeneralComponent);
    component = fixture.componentInstance;
    bilanGeneralServiceStub.selectionBilanGeneralMois.and.returnValue(of([]));
    bilanGeneralServiceStub.selectionBilanGeneralAnnee.and.returnValue(of([]));
    bilanGeneralServiceStub.selectionBilanGeneralPeriode.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('Méthode à testé recupererBilanGeneral',fakeAsync(()=>{

    localStorage.setItem('mois','10-2022')
    // GIVEN
    bilanGeneralServiceStub.selectionBilanGeneralMois.and.returnValue(of(bilan).pipe(delay(1)));
    bilanGeneralServiceStub.selectionBilanGeneralAnnee.and.returnValue(of(bilan).pipe(delay(1)));
    bilanGeneralServiceStub.selectionBilanGeneralPeriode.and.returnValue(of(bilan).pipe(delay(1)));

    // WHEN
    component.recupererDonneesFiltre();

    // THEN
    expect(component.loading).toBeTrue();
    tick(1);
    expect(component.bilanGenerals.length).toBe(5);
    expect(bilanGeneralServiceStub.selectionBilanGeneralMois).toHaveBeenCalled();
    expect(component.bilanGenerals).toEqual(bilan);
  }))

  it('Méthode à testé calculDesTotaux(bilans: BilanGeneral[])',()=>{

    component.calculDesTotaux(bilan)
    expect(component.total.totalNombreTicketVendu).toEqual(60)
    expect(component.total.totalNombreTicketGagnant).toEqual(125)
    expect(component.total.totalNombreTicketPending).toEqual(435)
    expect(component.total.totalGains).toEqual(370)
    expect(component.total.totalMise).toEqual(390)
    expect(component.total.totalBalance).toEqual(390)

  })
});

