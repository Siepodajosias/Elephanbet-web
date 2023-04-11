import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { GroupeDateComponent } from './groupe-date.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GroupeDateService } from 'src/app/shared-elephant-bet/services/groupe-date.service';
import { HttpClientModule } from '@angular/common/http';
import { GroupeDate } from 'src/app/shared-elephant-bet/models/limite';
import { delay, of } from 'rxjs';

describe('GroupeDateComponent', () => {
  let component: GroupeDateComponent;
  let fixture: ComponentFixture<GroupeDateComponent>;

  let groupeDate: GroupeDate[]=[
    {id:1,code:'40012',groupe:"Benfica",dateDebutLimite:new Date(),dateFinLimite:new Date()},
    {id:2,code:'40013',groupe:"ZANGO",dateDebutLimite:new Date(),dateFinLimite:new Date()},
    {id:3,code:'40014',groupe:"KIKOLO",dateDebutLimite:new Date(),dateFinLimite:new Date()},
    {id:4,code:'40013',groupe:"VIANA",dateDebutLimite:new Date(),dateFinLimite:new Date()}
  ];
  const groupeDateServiceStub = jasmine.createSpyObj('GroupeDateService', ['recupererGroupeDate','retirerGroupeDate']);
  const confirmationServiceStub = jasmine.createSpyObj('ConfirmationService', ['confirm']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeDateComponent ],
      imports:[HttpClientModule],
      providers:[
        { provide: GroupeDateService, useValue: groupeDateServiceStub },
        { provide: MessageService },
        { provide: ConfirmationService,useValue: confirmationServiceStub}
      ]
    })
            .compileComponents();

    fixture = TestBed.createComponent(GroupeDateComponent);
    component = fixture.componentInstance;
    confirmationServiceStub.confirm.calls.reset();
    groupeDateServiceStub.recupererGroupeDate.and.returnValue(of([]));
    groupeDateServiceStub.retirerGroupeDate.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('Test de la méthode recupererGroupeDatesExclusions',fakeAsync(()=>{
    // GIVEN
    groupeDateServiceStub.recupererGroupeDate.and.returnValue(of(groupeDate).pipe(delay(1)));
    // WHEN
    component.recupererGroupeDatesExclusions();
    // THEN
    expect(component.loading).toBeFalse();
    tick(1);
    expect(component.groupeDates.length).toBe(4);
    expect(groupeDateServiceStub.recupererGroupeDate).toHaveBeenCalled();
    expect(component.groupeDates).toEqual(groupeDate);
  }))

  it('Test de la méthode supprimerGroupeDate',fakeAsync(()=>{
    // GIVEN
    let idGroupeDate={id:1,code:'40012',groupe:"Benfica",dateDebutLimite:new Date(),dateFinLimite:new Date()};
    confirmationServiceStub.confirm.and.returnValue(of({}));

    // WHEN
    component.supprimerGroupeDateMessage(idGroupeDate);

    // THEN
    tick(1);
    expect(confirmationServiceStub.confirm).toHaveBeenCalled();
  }))

  it('Test de la méthode supprimerGroupeDateExclusion', fakeAsync(() => {
    // GIVEN
    let idGroupeDate={
      id:1,code:'40012',groupe:"Benfica",dateDebutLimite:new Date(),dateFinLimite:new Date()
    };

    groupeDateServiceStub.recupererGroupeDate.and.returnValue(of(groupeDate).pipe(delay(1)));
    groupeDateServiceStub.retirerGroupeDate.and.returnValue(of(null).pipe(delay(1)));
    component.recupererGroupeDatesExclusions();

    // WHEN
    component.supprimerGroupeDateExclusion(idGroupeDate);

    // THEN
    tick(1);
    expect(component.groupeDates.length).toBe(3);
    expect(groupeDateServiceStub.retirerGroupeDate).toHaveBeenCalled();
  }));

  it('Test de la méthode ouvrirModaleEdition', fakeAsync(() => {
    // GIVEN
    let idGroupeDate={
      id:1,code:'40012',groupe:"Benfica",dateDebutLimite:new Date(),dateFinLimite:new Date()
    };

    // WHEN
    component.ouvrirModaleEdition(idGroupeDate);
    // THEN
    tick(1);
    expect(component.editionParametrageVisible).toBeTrue();
    expect(component.groupeDate).toEqual(idGroupeDate);
  }));
});

