import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { MainPageComponent } from 'src/app/shared-elephant-bet/composants/main-page/main-page.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: 'main', component: MainPageComponent,
		children: [
			{
				path: 'retail/tableau-general',
				loadChildren: () => import('./modules/tableau-general/tableau-general.module')
						.then((t) => t.TableauGeneralModule),
				canActivate: [AuthGuard]
			},
			{
				path: 'retail/tableau-premios-Lojas',
				loadChildren: () => import('./modules/tableau-import-premios/tableau-import-premios-lojas.module')
						.then((m) => m.TableauImportPremiosLojasModule),
				canActivate: [AuthGuard]
			},
			{
				path: 'retail/tableau-mise',
				loadChildren: () => import('./modules/tableau-mise/tableau-mise.module')
						.then((m) => m.TableauMiseModule), canActivate: [AuthGuard]
			},
			{
				path: 'online/tableauGeneral-online',
				loadChildren: () => import('src/app/modules/tableau-general-online/tableau-general-online.module')
						.then((t) => t.TableauGeneralOnlineModule),
				canActivate: [AuthGuard]
			},
			{
				path: 'admin',
				loadChildren: () => import('./modules/admin/admin.module')
						.then((m) => m.AdminModule),
				canActivate: [AuthGuard]
			},
			{ path: '', redirectTo: 'table-general', pathMatch: 'full' },
			{
				path: '**',
				loadChildren: () => import('./modules/tableau-general/tableau-general.module')
						.then((t) => t.TableauGeneralModule),
				canActivate: [AuthGuard]
			}
		]
	},
	{ path: '', component: LoginComponent },
	{ path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
