import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LimiteTicketComponent } from './limite-ticket.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LimiteService } from 'src/app/shared-elephant-bet/services/limite.service';
import { HttpClientModule } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { Limite } from 'src/app/shared-elephant-bet/models/limite';

describe('LimiteTicketComponent', () => {
  let component: LimiteTicketComponent;
  let fixture: ComponentFixture<LimiteTicketComponent>;

  let limiteTicket: Limite[] = [
    { id: 1, code: '40082', limiteDebut: 70000, limiteFin: 90000, dateDebutLimite: '14-12-2022', dateFinLimite: '20-12-2022' },
    { id: 2, code: '40012', limiteDebut: 60000, limiteFin: 90700, dateDebutLimite: '14-12-2022', dateFinLimite: '20-12-2022' },
    { id: 3, code: '40072', limiteDebut: 80000, limiteFin: 90400, dateDebutLimite: '14-12-2022', dateFinLimite: '20-12-2022' },
    { id: 4, code: '40092', limiteDebut: 70000, limiteFin: 99000, dateDebutLimite: '14-12-2022', dateFinLimite: '20-12-2022' },
    { id: 5, code: '40032', limiteDebut: 30000, limiteFin: 97000, dateDebutLimite: '14-12-2022', dateFinLimite: '20-12-2022' }
  ];
  const limiteTicketServiceStub = jasmine.createSpyObj('LimiteService', ['recupererExclusionTicket', 'retirerExclusionTicket']);
  const confirmationServiceStub = jasmine.createSpyObj('ConfirmationService', ['confirm']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LimiteTicketComponent],
      imports: [HttpClientModule],
      providers: [

        { provide: LimiteService, useValue: limiteTicketServiceStub },
        { provide: MessageService },
        { provide: ConfirmationService,useValue: confirmationServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LimiteTicketComponent);
    component = fixture.componentInstance;
    confirmationServiceStub.confirm.calls.reset();
    limiteTicketServiceStub.recupererExclusionTicket.and.returnValue(of([]));
    limiteTicketServiceStub.retirerExclusionTicket.and.returnValue(of(null));
    fixture.detectChanges();
  });

  it('Test de la méthode recupererExclusionTicket', fakeAsync(() => {
    // GIVEN
    limiteTicketServiceStub.recupererExclusionTicket.and.returnValue(of(limiteTicket).pipe(delay(1)));
    // WHEN
    component.recupererExclusionTicket();
    // THEN
    expect(component.loading).toBeFalse();
    tick(1);
    expect(component.limiteTickets.length).toBe(5);
    expect(limiteTicketServiceStub.recupererExclusionTicket).toHaveBeenCalled();
    expect(component.limiteTickets).toEqual(limiteTicket);
  }));

  it('Test de la méthode supprimerExclusionTicket', fakeAsync(() => {
    // GIVEN
    let limite = {id:1,code:'40012',limiteDebut:70000,limiteFin:90000,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"};
    confirmationServiceStub.confirm.and.returnValue(of({}));

    // WHEN
    component.supprimerExclusionTicketMessage(limite);
    // THEN
    tick(1);
    expect(confirmationServiceStub.confirm).toHaveBeenCalled();

  }));

  it('Test de la méthode ouvrirModaleEdition', fakeAsync(() => {
    // GIVEN
    let limite = {id:1,code:'40012',limiteDebut:70000,limiteFin:90000,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"};

    // WHEN
    component.ouvrirModaleEdition(limite);
    // THEN
    tick(1);
    expect(component.editionParametrageVisible).toBeTrue();
    expect(component.limiteTicket).toEqual(limite);
  }));

  it('Test de la méthode supprimerTicket', fakeAsync(() => {
    // GIVEN
    let limite = {id:1,code:'40012',limiteDebut:70000,limiteFin:90000,dateDebutLimite:"14-12-2022",dateFinLimite:"20-12-2022"};
    limiteTicketServiceStub.recupererExclusionTicket.and.returnValue(of(limiteTicket).pipe(delay(1)));
    limiteTicketServiceStub.retirerExclusionTicket.and.returnValue(of(null).pipe(delay(1)));
    component.recupererExclusionTicket();

    // WHEN
    component.supprimerExclusionTicket(limite);

    // THEN
    tick(1);
    expect(component.limiteTickets.length).toBe(4);
    expect(limiteTicketServiceStub.retirerExclusionTicket).toHaveBeenCalled();
  }));
});

