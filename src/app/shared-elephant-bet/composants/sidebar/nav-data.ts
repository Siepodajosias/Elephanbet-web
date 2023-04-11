import { INavBarData } from 'src/app/shared-elephant-bet/composants/sidebar/helper';

export class NavbarData {
	private static menuRetail: INavBarData = {
		routerlink: 'retail',
		icon: 'pi pi-slack',
		label: 'RETAIL',
		items: [
			{
				routerlink: 'retail/tableau-general',
				icon: 'pi pi-th-large',
				label: 'Tableau général'
			},
			{
				routerlink: 'retail/tableau-premios-Lojas',
				icon: 'pi pi-th-large',
				label: 'Tableau Premios Lojas'
			},
			{
				routerlink: 'retail/tableau-mise',
				icon: 'fa-solid fa-hand-holding-dollar',
				label: 'Tableau des mises'
			}
		]
	};

	private static menuOnline: INavBarData = {
		routerlink: 'online',
		icon: 'pi pi-globe',
		label: 'ONLINE',
		items: [
			{
				routerlink: 'online/tableauGeneral-online',
				label: 'Tableau général',
				icon: 'pi pi-th-large',
			}
		]
	};

	private static menuAdministrateur: INavBarData = {
		routerlink: 'admin',
		icon: 'pi pi-cog',
		label: 'ADMINISTRATEUR',
		items: [
			{
				routerlink: 'admin/tableau-gain',
				icon: 'fa-solid fa-arrow-trend-up',
				label: 'Tableau des gains'
			},
			{
				routerlink: 'admin/utilisateur',
				label: 'Utilisateurs et droits',
				icon: 'pi pi-users',
			},
			{
				routerlink: 'admin/groupe-date',
				label: 'Groupes et dates',
				icon: 'pi pi-th-large',
			},
			{
				routerlink: 'admin/limite-gain',
				label: 'Limite gain',
				icon: 'fa-solid fa-arrow-trend-up',
			},
			{
				routerlink: 'admin/limite-ticket',
				label: 'Limite ticket',
				icon: 'fa-solid fa-hand-holding-dollar',
			},
			{
				routerlink: 'admin/import-online',
				label: 'Import online',
				icon: 'pi pi-download',
			},
			{
				routerlink: 'admin/import-premios-lojas',
				label: 'Import Premios Lojas',
				icon: 'pi pi-download',
			}
		]
	};

	static tousLesMenus(): INavBarData[] {
		return [this.menuRetail, this.menuOnline, this.menuAdministrateur];
	}

	static menusSansAdministrateur(): INavBarData[] {
		return [this.menuRetail, this.menuOnline];
	}
}
