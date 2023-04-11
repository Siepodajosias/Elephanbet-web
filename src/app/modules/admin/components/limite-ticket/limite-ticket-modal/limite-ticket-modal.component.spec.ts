import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LimiteTicketModalComponent } from './limite-ticket-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { LimiteService } from 'src/app/shared-elephant-bet/services/limite.service';
import { delay, of } from 'rxjs';
import { Limite } from 'src/app/shared-elephant-bet/models/limite';

describe('LimiteTicketModalComponent', () => {
  let component: LimiteTicketModalComponent;
  let fixture: ComponentFixture<LimiteTicketModalComponent>;

  let limiteTicket: Limite= { id: 1, code: '40082', limiteDebut: 70000, limiteFin: 90000, dateDebutLimite: '14-12-2022', dateFinLimite: '20-12-2022' }

  const limiteTicketServiceStub = jasmine.createSpyObj('LimiteService', ['enregistrerExclusion', 'modifierExclusion']);
  const messageServiceStub = jasmine.createSpyObj('MessageService', ['add']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimiteTicketModalComponent ],
      imports:[ReactiveFormsModule,HttpClientModule],
      providers:[
        { provide: MessageService, useValue: messageServiceStub },
        { provide: LimiteService, useValue: limiteTicketServiceStub },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LimiteTicketModalComponent);
    component = fixture.componentInstance;
    messageServiceStub.add.calls.reset();
    limiteTicketServiceStub.enregistrerExclusion.and.returnValue(of([]));
    limiteTicketServiceStub.modifierExclusion.and.returnValue(of(null));
    fixture.detectChanges();
  });

  it('Test de la méthode enregistrement', fakeAsync(() => {
    // GIVEN
    limiteTicketServiceStub.enregistrerExclusion.and.returnValue(of(limiteTicket).pipe(delay(1)));
    // WHEN
    component.enregistrement(limiteTicket);
    // THEN
    expect(component.loading).toBeFalse();
    tick(1);
    expect(limiteTicketServiceStub.enregistrerExclusion).toHaveBeenCalled();
  }));

  it('Test de la méthode modification', fakeAsync(() => {
    // GIVEN
    let limiteTicketModifier: Limite= { id: 1, code: '47082', limiteDebut: 70000, limiteFin: 90000, dateDebutLimite: '20-9-2022', dateFinLimite: '20-11-2022' }
    limiteTicketServiceStub.modifierExclusion.and.returnValue(of(limiteTicketModifier).pipe(delay(1)));
    // WHEN
    component.modification(limiteTicketModifier);
    // THEN
    expect(component.loading).toBeFalse();
    tick(1);
    expect(limiteTicketServiceStub.modifierExclusion).toHaveBeenCalled();
  }));

  it('Test de la méthode enregistrerExclusion', fakeAsync(() => {
    // GIVEN

    // WHEN
    component.enregistrerExclusion();
    // THEN
    expect(component.loading).toBeFalse();
    expect(component.submitted).toBeTrue();
    tick(1);
  }));

  it('Test de la méthode renseignerFormulaire', fakeAsync(() => {
    // GIVEN
    let limiteTicketForm: Limite= { id: 1, code: '47082', limiteDebut: 70000, limiteFin: 90000, dateDebutLimite: '20-9-2022', dateFinLimite: '20-11-2022' }
    // WHEN
    component.renseignerFormulaire(limiteTicketForm);
    // THEN
    expect(component.limiteTicketForm.get('id')?.value).toEqual(1);
    expect(component.limiteTicketForm.get('limiteDebut')?.value).toEqual(70000);
    expect(component.limiteTicketForm.get('limiteFin')?.value).toEqual(90000);
  }));
});
