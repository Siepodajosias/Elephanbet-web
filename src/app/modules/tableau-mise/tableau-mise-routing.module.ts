import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauMisesComponent } from 'src/app/modules/tableau-mise/composents/tableau-mises.component';

const routes: Routes = [
	{ path: '', component: TableauMisesComponent },
	{ path: '**', component: TableauMisesComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TableauMiseRoutingModule {
}
