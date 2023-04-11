import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LimiteGainComponent } from './limite-gain.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LimiteService } from 'src/app/shared-elephant-bet/services/limite.service';
import { HttpClientModule } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { Limite } from 'src/app/shared-elephant-bet/models/limite';

describe('LimiteGainComponent', () => {
  let component: LimiteGainComponent;
  let fixture: ComponentFixture<LimiteGainComponent>;
  let limiteGain: Limite[]=[
    {id:1,code:'40082',limiteDebut:70000,limiteFin:90000,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"},
    {id:2,code:'40012',limiteDebut:60000,limiteFin:90700,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"},
    {id:3,code:'40072',limiteDebut:80000,limiteFin:90400,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"},
    {id:4,code:'40092',limiteDebut:70000,limiteFin:99000,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"},
    {id:5,code:'40032',limiteDebut:30000,limiteFin:97000,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"}
  ];
  const limiteServiceStub = jasmine.createSpyObj('LimiteService', ['recupererExclusionGain', 'retirerExclusionGain']);
  const confirmationServiceStub = jasmine.createSpyObj('ConfirmationService', ['confirm']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimiteGainComponent ],
      imports:[HttpClientModule],
      providers:[
        { provide: LimiteService, useValue: limiteServiceStub},
        { provide: MessageService },
        { provide: ConfirmationService,useValue: confirmationServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LimiteGainComponent);
    component = fixture.componentInstance;
    confirmationServiceStub.confirm.calls.reset();
    limiteServiceStub.recupererExclusionGain.and.returnValue(of([]));
    limiteServiceStub.retirerExclusionGain.and.returnValue(of(null));
    fixture.detectChanges();
  });

  it('Test de la méthode recupererExclusionGain',fakeAsync(()=>{
    // GIVEN
    limiteServiceStub.recupererExclusionGain.and.returnValue(of(limiteGain).pipe(delay(1)));
    // WHEN
    component.recupererExclusionGain();
    // THEN
    expect(component.loading).toBeFalse();
    tick(1);
    expect(component.limiteGains.length).toBe(5);
    expect(limiteServiceStub.recupererExclusionGain).toHaveBeenCalled();
    expect(component.limiteGains).toEqual(limiteGain);
  }))

  it('Test de la méthode supprimerExclusionGain',fakeAsync(()=>{
    // GIVEN
    let limiteGain= {id:1,code:'40012',limiteDebut:70000,limiteFin:90000,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"};
    confirmationServiceStub.confirm.and.returnValue(of({}));

    // WHEN
    component.supprimerExclusionGainMessage(limiteGain);

    // THEN
    tick(1);
    expect(confirmationServiceStub.confirm).toHaveBeenCalled();

  }))

  it('Test de la méthode ouvrirModaleEdition', fakeAsync(() => {
    // GIVEN
    let limite = {id:1,code:'40012',limiteDebut:70000,limiteFin:90000,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"};

    // WHEN
    component.ouvrirModaleEdition(limite);
    // THEN
    tick(1);
    expect(component.editionParametrageVisible).toBeTrue();
    expect(component.limiteGain).toEqual(limite);
  }));

  it('Test de la méthode supprimerGain', fakeAsync(() => {
    // GIVEN
    let limite = {id:1,code:'40012',limiteDebut:70000,limiteFin:90000,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"};
    limiteServiceStub.recupererExclusionGain.and.returnValue(of(limiteGain).pipe(delay(1)));
    limiteServiceStub.retirerExclusionGain.and.returnValue(of(null).pipe(delay(1)));
    component.recupererExclusionGain();

    // WHEN
    component.supprimerExclusionGain(limite);

    // THEN
    tick(1);
    expect(component.limiteGains.length).toBe(4);
    expect(limiteServiceStub.retirerExclusionGain).toHaveBeenCalled();
  }));

});

