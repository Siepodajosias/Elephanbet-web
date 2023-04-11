import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SpeedDialModule } from 'primeng/speeddial';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BadgeModule } from 'primeng/badge';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedElephantBetModule } from 'src/app/shared-elephant-bet/shared-elephant-bet.module';

//les components
import { Utilisateurs } from 'src/app/modules/admin/components/utilisateurs/utilisateurs';
import { LimiteGainComponent } from './components/limite-gain/limite-gain.component';
import { LimiteTicketComponent } from './components/limite-ticket/limite-ticket.component';
import { GroupeDateComponent } from './components/groupe-date/groupe-date.component';
import { ImportOnlineComponent } from 'src/app/modules/admin/components/import-online/import-online.component';
import { TableauGainsComponent } from 'src/app/modules/admin/components/tableau-gain/tableau-gains.component';
import { ImportPremiosLojasComponent } from 'src/app/modules/admin/components/import-premios-lojas/import-premios-lojas.component';
import { GroupeDateModalComponent } from './components/groupe-date/groupe-date-modal/groupe-date-modal.component';
import { LimiteGainModalComponent } from './components/limite-gain/limite-gain-modal/limite-gain-modal.component';
import { LimiteTicketModalComponent } from './components/limite-ticket/limite-ticket-modal/limite-ticket-modal.component';
import { UtilisateurModal } from 'src/app/modules/admin/components/utilisateurs/utilisateur-modal/utilisateur-modal';

//les services
import { UtilisateurService } from 'src/app/shared-elephant-bet/services/utilisateur.service';
import { BilanGeneralService } from 'src/app/shared-elephant-bet/services/bilan-general.service';
import { BilanGainService } from 'src/app/shared-elephant-bet/services/bilan-gain.service';
import { BilanMiseService } from 'src/app/shared-elephant-bet/services/bilan-mise.service';
import { GroupeDateService } from 'src/app/shared-elephant-bet/services/groupe-date.service';
import { LimiteService } from 'src/app/shared-elephant-bet/services/limite.service';

@NgModule({
	declarations: [
		Utilisateurs,
		GroupeDateComponent,
		LimiteGainComponent,
		LimiteTicketComponent,
		UtilisateurModal,
		GroupeDateModalComponent,
		LimiteGainModalComponent,
		LimiteTicketModalComponent,
		ImportOnlineComponent,
		TableauGainsComponent,
		ImportPremiosLojasComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		ToolbarModule,
		MenuModule,
		MenubarModule,
		SpeedDialModule,
		TableModule,
		TreeModule,
		BadgeModule,
		MatProgressBarModule,
		SplitButtonModule,
		ToastModule,
		DialogModule,
		ReactiveFormsModule,
		InputTextModule,
		DropdownModule,
		FormsModule,
		ProgressSpinnerModule,
		CalendarModule,
		PanelMenuModule,
		ConfirmDialogModule,
		RippleModule,
		AutoCompleteModule,
		SharedElephantBetModule,
		MessagesModule,
		TagModule,
		MultiSelectModule,
		FileUploadModule
	],
	providers: [
		UtilisateurService,
		BilanGeneralService,
		BilanGainService,
		BilanMiseService,
		MessageService,
		GroupeDateService,
		LimiteService,
		ConfirmationService,
		DatePipe
	]
})
export class AdminModule {
}
