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

@NgModule({
  imports: [
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
    RouterModule.forRoot([
      { path: '', component: ClientListComponent },
      { path: 'client/:clientId', component: ClientDetailsComponent },
      { path: 'client/:clientId/devices', component: DevicesListComponent },
      { path: 'client/:clientId/devices/:deviceId', component: DeviceDetailsComponent },
      { path: 'client/:clientId/policies', component: PoliciesListComponent },
      { path: 'client/:clientId/enterprise', component: EnterpriseDetailsComponent },
      { path: 'newClient', component: ClientNewComponent },
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
  ],
  bootstrap: [AppComponent],
  providers: [FLASKAPIService]
})
export class AppModule {}
