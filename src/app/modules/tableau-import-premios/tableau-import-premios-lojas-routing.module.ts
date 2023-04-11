import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableauImportPremiosComponent } from 'src/app/modules/tableau-import-premios/composants/tableau-import-premios.component';

const routes: Routes = [
	{ path: 'tableau-premios-Lojas', component: TableauImportPremiosComponent },
	{ path: '**', component: TableauImportPremiosComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TableauImportPremiosLojasRoutingModule {
}
