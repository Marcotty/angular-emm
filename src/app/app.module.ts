import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule} from '@angular/material/input';
import { HttpClientModule } from "@angular/common/http";
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { ClientListComponent } from "./client-list/client-list.component";
import { ClientDetailsComponent } from "./client-details/client-details.component";
import { DevicesListComponent } from './devices-list/devices-list.component';
import { FLASKAPIService } from './flask-api.service';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { PoliciesListComponent } from './policies-list/policies-list.component';
import { EnterpriseDetailsComponent } from './enterprise-details/enterprise-details.component';
import { ClientNewComponent } from './client-new/client-new.component';
import { PolicyNewComponent } from './policy-new/policy-new.component';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    MatListModule,
    MatExpansionModule,
    MatStepperModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      { path: '', component: ClientListComponent },
      { path: 'client/:name', component: ClientDetailsComponent },
      { path: 'client/:name/:enterprise_name/devices', component: DevicesListComponent },
      { path: 'client/:clientId/devices/:deviceId', component: DeviceDetailsComponent },
      { path: 'client/:name/:enterprise_name/policies', component: PoliciesListComponent },
      { path: 'client/:name/:enterprise_name/policies/new', component: PolicyNewComponent },
      { path: 'client/:name/:enterprise_name/enterprise', component: EnterpriseDetailsComponent },
      { path: 'newClient', component: ClientNewComponent },
      { path: '**', redirectTo:'/' },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ClientListComponent,
    ClientDetailsComponent,
    DevicesListComponent,
    DeviceDetailsComponent,
    PoliciesListComponent,
    EnterpriseDetailsComponent,
    ClientNewComponent,
    PolicyNewComponent,
  ],
  bootstrap: [AppComponent],
  providers: [FLASKAPIService]
})
export class AppModule {}
