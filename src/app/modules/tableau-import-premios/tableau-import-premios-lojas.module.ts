import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauImportPremiosLojasRoutingModule } from 'src/app/modules/tableau-import-premios/tableau-import-premios-lojas-routing.module';
import { TableauImportPremiosComponent } from 'src/app/modules/tableau-import-premios/composants/tableau-import-premios.component';
import { TableModule } from 'primeng/table';
import { SharedElephantBetModule } from 'src/app/shared-elephant-bet/shared-elephant-bet.module';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
	declarations: [
		TableauImportPremiosComponent
	],
	imports: [
		CommonModule,
		TableauImportPremiosLojasRoutingModule,
		TableModule,
		SharedElephantBetModule,
		ToolbarModule,
		InputTextModule,
		ButtonModule
	]
})
export class TableauImportPremiosLojasModule {
}
