import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FLASKAPIService } from "../flask-api.service";
import { Subscription } from "rxjs";
import { clients } from "../client-list/clients";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: "app-policies-table",
  templateUrl: "./policies-table.component.html",
  styleUrls: ["./policies-table.component.css"]
})
export class PoliciesTableComponent implements OnInit {
  policiesListSubs: Subscription;
  policies: intPolicy[];
  ELEMENT_DATA: intPolicy[];
  @Input() client : clients;
  displayedColumns: string[] = ['version', 'name', 'weight', 'symbol'];
  dataSource ;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private API : FLASKAPIService) {}

  ngOnInit() {
    console.log('client : ' + this.client.entreprise_name);
    this.getPolicies();
    this.ELEMENT_DATA = this.policies;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
  }
  getPolicies()
  {
    this.policiesListSubs = this.API
      .getPolicies(this.client.entreprise_name)
      .subscribe(res => {
        this.policies = res;
        console.log("politiques chargées dans la table : "+ res);
      }, console.error);
  }
}

export interface AdvancedSecurityOverrides {
  untrustedAppsPolicy: string;
}

export interface Application {
  defaultPermissionPolicy: string;
  installType: string;
  packageName: string;
}

export interface KioskCustomization {
  deviceSettings: string;
  powerButtonActions: string;
  statusBar: string;
  systemNavigation: string;
}

export interface ApplicationReportingSettings {
  includeRemovedApps: boolean;
}

export interface StatusReportingSettings {
  applicationReportingSettings: ApplicationReportingSettings;
  applicationReportsEnabled: boolean;
  deviceSettingsEnabled: boolean;
  displayInfoEnabled: boolean;
  hardwareStatusEnabled: boolean;
  memoryInfoEnabled: boolean;
  networkInfoEnabled: boolean;
  powerManagementEventsEnabled: boolean;
  softwareInfoEnabled: boolean;
  systemPropertiesEnabled: boolean;
}

export interface SystemUpdate {
  type: string;
}

export interface intPolicy {
  advancedSecurityOverrides: AdvancedSecurityOverrides;
  appAutoUpdatePolicy: string;
  applications: Application[];
  bluetoothConfigDisabled: boolean;
  bluetoothDisabled: boolean;
  debuggingFeaturesAllowed: boolean;
  kioskCustomization: KioskCustomization;
  name: string;
  statusReportingSettings: StatusReportingSettings;
  systemUpdate: SystemUpdate;
  version: string;
}
