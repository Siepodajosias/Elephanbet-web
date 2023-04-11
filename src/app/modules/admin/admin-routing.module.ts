import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupeDateComponent } from './components/groupe-date/groupe-date.component';
import { LimiteGainComponent } from './components/limite-gain/limite-gain.component';
import { LimiteTicketComponent } from './components/limite-ticket/limite-ticket.component';
import { Utilisateurs } from 'src/app/modules/admin/components/utilisateurs/utilisateurs';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ImportOnlineComponent } from 'src/app/modules/admin/components/import-online/import-online.component';
import { TableauGainsComponent } from 'src/app/modules/admin/components/tableau-gain/tableau-gains.component';
import { ImportPremiosLojasComponent } from 'src/app/modules/admin/components/import-premios-lojas/import-premios-lojas.component';

const routes: Routes = [
	{ path: 'tableau-gain', component: TableauGainsComponent, canActivate: [AuthGuard] },
	{ path: 'utilisateur', component: Utilisateurs, canActivate: [AuthGuard] },
	{ path: 'groupe-date', component: GroupeDateComponent, canActivate: [AuthGuard] },
	{ path: 'limite-gain', component: LimiteGainComponent, canActivate: [AuthGuard] },
	{ path: 'limite-ticket', component: LimiteTicketComponent, canActivate: [AuthGuard] },
	{ path: 'import-online', component: ImportOnlineComponent, canActivate: [AuthGuard] },
	{ path: 'import-premios-lojas', component: ImportPremiosLojasComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {
}
