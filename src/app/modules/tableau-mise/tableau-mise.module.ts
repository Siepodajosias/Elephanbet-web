import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TableauMiseRoutingModule } from 'src/app/modules/tableau-mise/tableau-mise-routing.module';
import { TableauMisesComponent } from 'src/app/modules/tableau-mise/composents/tableau-mises.component';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedElephantBetModule } from 'src/app/shared-elephant-bet/shared-elephant-bet.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
	declarations: [
		TableauMisesComponent,
	],
	imports: [
		CommonModule,
		TableModule,
		ToolbarModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		InputTextModule,
		TableauMiseRoutingModule,
		SharedElephantBetModule,
		TooltipModule,
	]
	, providers: []
})
export class TableauMiseModule {
}
