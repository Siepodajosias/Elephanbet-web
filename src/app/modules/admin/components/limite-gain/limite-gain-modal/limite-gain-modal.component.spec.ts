import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LimiteGainModalComponent } from './limite-gain-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { LimiteService } from 'src/app/shared-elephant-bet/services/limite.service';
import { delay, of } from 'rxjs';
import { Limite } from 'src/app/shared-elephant-bet/models/limite';

describe('LimiteGainModalComponent', () => {
  let component: LimiteGainModalComponent;
  let fixture: ComponentFixture<LimiteGainModalComponent>;

  let limiteGain: Limite={id:1,code:'40082',limiteDebut:70000,limiteFin:90000,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"}


  const limiteGainServiceStub = jasmine.createSpyObj('LimiteService', ['enregistrerExclusion', 'modifierExclusion']);
  const messageServiceStub = jasmine.createSpyObj('MessageService', ['add']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimiteGainModalComponent ],
      imports:[ReactiveFormsModule,HttpClientModule],
      providers:[
        { provide: MessageService, useValue: messageServiceStub },
        { provide: LimiteService, useValue: limiteGainServiceStub },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LimiteGainModalComponent);
    component = fixture.componentInstance;
    messageServiceStub.add.calls.reset();
    limiteGainServiceStub.enregistrerExclusion.and.returnValue(of([]));
    limiteGainServiceStub.modifierExclusion.and.returnValue(of(null));
    fixture.detectChanges();
  });

  it('Test de la méthode enregistrement', fakeAsync(() => {
    // GIVEN
    limiteGainServiceStub.enregistrerExclusion.and.returnValue(of(limiteGain).pipe(delay(1)));
    // WHEN
    component.enregistrement(limiteGain);
    // THEN
    expect(component.loading).toBeFalse();
    tick(1);
    expect(limiteGainServiceStub.enregistrerExclusion).toHaveBeenCalled();
  }));

  it('Test de la méthode modification', fakeAsync(() => {
    // GIVEN
    let limiteGainModifier: Limite= {id:1,code:'49082',limiteDebut:74000,limiteFin:92000,dateDebutLimite:"01-12-2022",dateFinLimite:"28-12-2022"}
    limiteGainServiceStub.modifierExclusion.and.returnValue(of(limiteGainModifier).pipe(delay(1)));
    // WHEN
    component.modification(limiteGainModifier);
    // THEN
    expect(component.loading).toBeFalse();
    tick(1);
    expect(limiteGainServiceStub.modifierExclusion).toHaveBeenCalled();
  }));

  it('Test de la méthode enregistrerExclusion', fakeAsync(() => {
    // GIVEN

    // WHEN
    component.enregistrerExclusion();
    // THEN
    expect(component.loading).toBeFalse();
    expect(component.submitted).toBeTrue();
  }));

  it('Test de la méthode renseignerFormulaire', fakeAsync(() => {
    // GIVEN
    let limiteGainForm: Limite= {id:1,code:'40082',limiteDebut:70000,limiteFin:90000,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"}
    // WHEN
    component.renseignerFormulaire(limiteGainForm);
    // THEN
    expect(component.limiteGainForm.get('id')?.value).toEqual(1);
    expect(component.limiteGainForm.get('limiteDebut')?.value).toEqual(70000);
    expect(component.limiteGainForm.get('limiteFin')?.value).toEqual(90000);
  }));
});
