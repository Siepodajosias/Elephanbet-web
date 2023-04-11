import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauGeneralComponent } from 'src/app/modules/tableau-general/composants/tableau-general/tableau-general.component';

const routes: Routes = [
	{ path: '', component: TableauGeneralComponent },
	{ path: '**', component: TableauGeneralComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TableauGeneralRoutingModule {
}
