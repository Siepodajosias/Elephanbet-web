import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TableauGeneralRoutingModule } from 'src/app/modules/tableau-general/tableau-general-routing.module';
import { TableauGeneralComponent } from 'src/app/modules/tableau-general/composants/tableau-general/tableau-general.component';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { SharedElephantBetModule } from 'src/app/shared-elephant-bet/shared-elephant-bet.module';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { BilanJeuService } from 'src/app/shared-elephant-bet/services/bilan-jeu.service';
import { BilanGainService } from 'src/app/shared-elephant-bet/services/bilan-gain.service';

@NgModule({
	declarations: [
		TableauGeneralComponent
	],
	imports: [
		CommonModule,
		TableauGeneralRoutingModule,
		TableModule,
		ToolbarModule,
		FormsModule,
		ButtonModule,
		SharedElephantBetModule,
		TooltipModule,
		StyleClassModule,
		InputTextModule
	], providers: [BilanJeuService, BilanGainService]
})
export class TableauGeneralModule {
}
