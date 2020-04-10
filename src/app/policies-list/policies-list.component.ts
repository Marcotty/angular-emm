import { Component, OnInit } from "@angular/core";
import { FLASKAPIService } from "../flask-api.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { clients } from "../client-list/clients";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Policy, installTypeValues, appAutoUpdateValues, defaultPermissionValues, 
          boolDisabled, keyguardFeature, locationMode, encryptionPolicy, playStoreMode } from "./policies.model";
@Component({
  selector: "app-policies-list",
  templateUrl: "./policies-list.component.html",
  styleUrls: ["./policies-list.component.css"]
})
export class PoliciesListComponent implements OnInit {
  client;
  clientId;
  policiesListSubs: Subscription;
  policies: Policy[];
  installTypeValues = installTypeValues;
  appAutoUpdateValues = appAutoUpdateValues;
  boolDisabled = boolDisabled;
  defaultPermissionValues = defaultPermissionValues;
  keyguardFeature = keyguardFeature;
  locationMode = locationMode;
  encryptionPolicy = encryptionPolicy;
  playStoreMode = playStoreMode;
  QR_code: string[] = [];
  inscriptionAuto = false;
  constructor(
    private route: ActivatedRoute,
    private devicesApi: FLASKAPIService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.client = clients[+params.get("clientId")];
      this.clientId = params.get("clientId");
    });
    this.getPolicies();
  }
  getPolicies()
  {
    this.policiesListSubs = this.devicesApi
      .getPolicies(this.client.entreprise_name)
      .subscribe(res => {
        this.policies = res;
        console.log("politiques chargées : "+ res);
        if(this.inscriptionAuto)
        {
          for (let i = 0; i < this.policies.length; i++) {
          this.inscription(i);
          }
        }
      }, console.error);
  }
  update(policyId) {
    this.openSnackBar("Mise à jour en cours", "Fermer");
    this.devicesApi.updatePolicy(this.policies[policyId])
    .subscribe(res => {
      //this.policies[policyId] = res;
      console.log("update effectuée");
    }, console.error);
    this.openSnackBar("Mise à jour réussie", "Fermer");
  }
  openSnackBar(message : string, action : string)
  {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  inscription(policyId) {
    this.devicesApi
      .inscriptionPolicy(this.policies[policyId].name)
      .subscribe(res => {
        this.QR_code[policyId] = res;
        console.log("QR_code[" + policyId + "] reçu " + this.QR_code[policyId]);
      }, console.error);
  }
  onChanged(champ : string, policyId, event)
  {
    console.log("champ : " + champ + ": " + event);
    switch(champ)
    {
      case 'bluetooth':
        this.policies[policyId].bluetoothDisabled = event;
        break;
      case 'addUser':
        this.policies[policyId].addUserDisabled = event;
    }
  }
  delete(policyName)
  {
    this.devicesApi.deletePolicy(policyName)
    .subscribe(res =>{
      console.log('Suppression effectuée');
    }, console.error);
    this.refresh();
  }
  refresh()
  {
    this.getPolicies();
  }
  addApp(policyId, appId)
  {
    console.log('appId : ' + appId);
    this.policies[policyId].applications[appId+1] = 
    JSON.parse('{"packageName":"com.google.earth","installType": "AVAILABLE"}');
  }
  addAppli(policyId)
  {
    this.policies[policyId].applications.push(JSON.parse('{"packageName":"com.google.earth","installType": "AVAILABLE"}'));
  }
  delApp(policyId, appId)
  {
    this.policies[policyId].applications.splice(appId, 1); 
  }
  createNetwork(policyId, guid: string, name: string, ssid : string, type: string, cle : string)
  {
    console.log('guid : ' + guid);
    console.log('name : ' + name);
    console.log('ssid' + ssid);
    console.log('type : ' + type);
    console.log('cle : ' + cle);
    this.policies[policyId].openNetworkConfiguration.networkConfigurations.push(JSON.parse(
      '{"GUID" : "a", "Name":"a", "Type":"WiFi", "WiFi": {"SSID":"ssid", "Security":"WPA-PSK", "Passphrase":"cle"}}'
    ));
    console.log('network : ' + this.policies[policyId].openNetworkConfiguration.networkConfigurations[0].GUID);
  }
}
