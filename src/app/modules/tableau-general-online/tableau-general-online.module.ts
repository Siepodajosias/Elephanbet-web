import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauGeneralOnlineRoutingModule } from 'src/app/modules/tableau-general-online/tableau-general-online-routing.module';
import { TableauGeneralOnlineComponent } from 'src/app/modules/tableau-general-online/composants/tableau-general-online/tableau-general-online.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedElephantBetModule } from 'src/app/shared-elephant-bet/shared-elephant-bet.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
          TableauGeneralOnlineComponent
  ],
  imports: [
    CommonModule,
    TableauGeneralOnlineRoutingModule,
    TableModule,
    ToolbarModule,
    SharedElephantBetModule,
    ButtonModule,
    InputTextModule
  ]
})
export class TableauGeneralOnlineModule { }
