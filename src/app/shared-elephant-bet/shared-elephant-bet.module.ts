import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NombrePipe } from 'src/app/shared-elephant-bet/pipes/PipeNombre';
import { ReplacePipe } from 'src/app/shared-elephant-bet/pipes/ReplacePipe';
import { FormateDateService } from 'src/app/shared-elephant-bet/services/formate-date.service';

@NgModule({
	declarations: [
		NombrePipe,
		ReplacePipe
	],
	imports: [
		CommonModule
	],
	exports: [
		NombrePipe,
		ReplacePipe,
		CurrencyPipe
	],
	providers: [
		ReplacePipe,
		NombrePipe,
		CurrencyPipe,
		FormateDateService
	]
})
export class SharedElephantBetModule {
}
