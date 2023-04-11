import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { animate, trigger, transition, style } from '@angular/animations';
import { NavbarData } from 'src/app/shared-elephant-bet/composants/sidebar/nav-data';
import { INavBarData } from 'src/app/shared-elephant-bet/composants/sidebar/helper';
import { Utilisateur } from 'src/app/shared-elephant-bet/models/utilisateur';
import { LoginService } from 'src/app/shared-elephant-bet/services/login.service';
import { Router } from '@angular/router';

interface SideNavToggle {
	screenwidth: number;
	collapsed: boolean
}

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	animations: [
		trigger('fadeInOut', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('350ms',
						style({ opacity: 1 })
				)
			]),
			transition(':leave', [
				style({ opacity: 1 }),
				animate('350ms',
						style({ opacity: 0 })
				)
			])
		]),
	]
})
export class SidebarComponent implements OnInit {

	@Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
	collapsed = true;
	screenwidth = 0;
	navData: INavBarData[] = [];
	multiple: boolean = false;
	role: string = '';
	nom: string;
	prenoms: string;
	userProfile: Utilisateur;

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.screenwidth = window.innerWidth;
		if (this.screenwidth <= 768) {
			this.collapsed = false;
			this.onToggleSideNav.emit({ collapsed: this.collapsed, screenwidth: this.screenwidth });
		}
	}

	constructor(private loginService: LoginService,
				private route: Router) {
	}

	ngOnInit(): void {
		this.screenwidth = window.innerWidth;
		this.userProfile = this.loginService.recupererUtilisateurConnecte();
		this.construireMenusAutorises();
		if (this.userProfile) {
			this.nom = this.userProfile.nom;
			this.prenoms = this.userProfile.prenoms;
			this.role = this.userProfile.role;
		}
	}

	public toggleCollapse(): void {
		this.collapsed = !this.collapsed;
		this.onToggleSideNav.emit({ collapsed: this.collapsed, screenwidth: this.screenwidth });
	}

	public toggleAdminItems(): void {
		if (!this.collapsed) {
			this.collapsed = true;
			this.onToggleSideNav.emit({ collapsed: this.collapsed, screenwidth: this.screenwidth });
		}
	}

	public closeSidenav(): void {
		this.collapsed = false;
		this.onToggleSideNav.emit({ collapsed: this.collapsed, screenwidth: this.screenwidth });
	}

	public handleClick(item: INavBarData): void {
		if (!this.multiple) {
			for (let modelItem of this.navData) {
				if (item !== modelItem && modelItem.expanded) {
					modelItem.expanded = false;
				}
			}
		}
		item.expanded = !item.expanded;
	}

	/**
	 * Déconnecte un Utilisateur.
	 */
	public quiter(): void {
		localStorage.clear();
		this.route.navigate(['/login']);
	}

	/**
	 * Affiche les items pour un menu sélectionné.
	 *
	 * @param menu le menu.
	 * @return true si le menu est sélectionné.
	 */
	public isMenuActive(menu: INavBarData): void {
		const url = window.location.href;
		/*if(url.includes(menu.routerlink)) {
			this.handleClick(menu);
		}*/
	}

	/**
	 * Construit les menus autorisés à l'utilisateur.
	 *
	 * @private
	 */
	private construireMenusAutorises() {
		if (this.userProfile.role === 'LECTEUR_SIMPLE') {
			this.navData = NavbarData.menusSansAdministrateur();
		} else {
			this.navData = NavbarData.tousLesMenus();
		}
	}
}
