import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauGeneralOnlineComponent } from 'src/app/modules/tableau-general-online/composants/tableau-general-online/tableau-general-online.component';

const routes: Routes = [
	{ path: '', component: TableauGeneralOnlineComponent },
	{ path: '**', component: TableauGeneralOnlineComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TableauGeneralOnlineRoutingModule {
}
