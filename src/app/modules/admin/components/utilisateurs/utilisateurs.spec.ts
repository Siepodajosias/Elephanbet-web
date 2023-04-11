import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UtilisateurService } from 'src/app/shared-elephant-bet/services/utilisateur.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

import { delay, of } from 'rxjs';
import { Utilisateur } from 'src/app/shared-elephant-bet/models/utilisateur';
import { Utilisateurs } from 'src/app/modules/admin/components/utilisateurs/utilisateurs';


describe('UtilisateurComponent', () => {
	let component: Utilisateurs;
	let fixture: ComponentFixture<Utilisateurs>;

	let utilisateur: Utilisateur[]=[
		{id:1,nom:'DIABY',prenoms:"Kader",username:"kader",password:"777",role:"ADMIN"},
		{id:2,nom:'KONE',prenoms:"Diarassouba",username:"diarassouba",password:"777",role:"LECTEUR_SIMPLE"},
		{id:3,nom:'IBO',prenoms:"Ezechiel",username:"ezechiel",password:"777",role:"ADMIN"},
		{id:4,nom:'YAO',prenoms:"Atta Yvan",username:"atta",password:"777",role:"LECTEUR_SIMPLE"},
		{id:5,nom:'TIEMELE',prenoms:"Olivier",username:"olivier",password:"777",role:"LECTEUR_SIMPLE"}
	];

	const utilisateurServiceStub = jasmine.createSpyObj('UtilisateurService', ['listerUtiliseur','supprimerUtilisateur']);
	const confirmationServiceStub = jasmine.createSpyObj('ConfirmationService', ['confirm']);

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [Utilisateurs],
			imports:[HttpClientModule],
			providers:[
				{ provide: MessageService },
				{ provide: ConfirmationService,useValue: confirmationServiceStub},
				{ provide: UtilisateurService, useValue: utilisateurServiceStub }]
		}).compileComponents();

		fixture = TestBed.createComponent(Utilisateurs);
		component = fixture.componentInstance;
		confirmationServiceStub.confirm.calls.reset();
		utilisateurServiceStub.listerUtiliseur.and.returnValue(of([]));
		utilisateurServiceStub.supprimerUtilisateur.and.returnValue(of([]));
		fixture.detectChanges();
	});

	it('Test de la méthode recupererUtilisateurs',fakeAsync(()=>{
		// GIVEN
		utilisateurServiceStub.listerUtiliseur.and.returnValue(of(utilisateur).pipe(delay(1)));
		// WHEN
		component.recupererUtilisateurs();
		// THEN
		expect(component.loading).toBeFalse();
		tick(1);
		expect(component.utilisateurs.length).toBe(5);
		expect(utilisateurServiceStub.listerUtiliseur).toHaveBeenCalled();
		expect(component.utilisateurs).toEqual(utilisateur);
	}))

	it('Test de la méthode supprimerUtilisateur',fakeAsync(()=>{
		// GIVEN
		let idUtilisateur={id:5,nom:'TIEMELE',prenoms:"Olivier",username:"olivier",password:"777",role:"LECTEUR_SIMPLE"};
		confirmationServiceStub.confirm.and.returnValue(of({}));

		// WHEN
		component.supprimerUtilisateur(idUtilisateur);

		// THEN
		tick(1);
		expect(confirmationServiceStub.confirm).toHaveBeenCalled();
	}))

	it('Test de la méthode retirerUtilisateur', fakeAsync(() => {
		// GIVEN
		let idUtilisateur={id:5,nom:'TIEMELE',prenoms:"Olivier",username:"olivier",password:"777",role:"LECTEUR_SIMPLE"};

		utilisateurServiceStub.listerUtiliseur.and.returnValue(of(utilisateur).pipe(delay(1)));
		utilisateurServiceStub.supprimerUtilisateur.and.returnValue(of(null).pipe(delay(1)));
		component.recupererUtilisateurs();

		// WHEN
		component.retirerUtilisateur(idUtilisateur);

		// THEN
		tick(1);
		expect(component.utilisateurs.length).toBe(4);
		expect(utilisateurServiceStub.supprimerUtilisateur).toHaveBeenCalled();
	}));

	it('Test de la méthode ouvrirModaleEdition', fakeAsync(() => {
		// GIVEN
		let idUtilisateur={id:5,nom:'TIEMELE',prenoms:"Olivier",username:"olivier",password:"777",role:"LECTEUR_SIMPLE"};

		// WHEN
		component.ouvrirModaleEdition(idUtilisateur);
		// THEN
		tick(1);
		expect(component.editionUtilisateurVisible).toBeTrue();
		expect(component.utilisateur).toEqual(idUtilisateur);
	}));
});
