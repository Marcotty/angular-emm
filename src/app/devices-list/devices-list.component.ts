import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { clients } from "../client-list/clients";
import { FLASKAPIService } from "../flask-api.service";
import { Device, DeviceState } from "./device.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-devices-list",
  templateUrl: "./devices-list.component.html",
  styleUrls: ["./devices-list.component.css"]
})
export class DevicesListComponent implements OnInit {
  client;
  clientId;
  devicesListSubs: Subscription;
  devicesList: Device[];
  deviceStates = DeviceState;
  enterprise_name;
  name;
  noDevices: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private devicesApi: FLASKAPIService,
    private _snackBar: MatSnackBar
  ) {this.noDevices = false;}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.enterprise_name = params.get("enterprise_name");
      this.name = params.get("name");
      //this.client = clients[+params.get("clientId")];
      //this.clientId = params.get("clientId");
    });
    this.getDevices();
  }
  getDevices() {
    this.devicesListSubs = this.devicesApi
      .getDevices(this.enterprise_name)
      .subscribe(res => {
        if (res.toString() == "Pas de devices") {
          this.noDevices = true;
          this.openSnackBar("Pas de devices trouvés !", "Fermer");
        }
        else
        {
          this.noDevices = true;
          this.devicesList = res;
          this.openSnackBar("Devices chargés", "Fermer");
        }
      }, err => console.error);
  }
  // Message affiché en bas d'écran
  // ARGs : le message et une action
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
  refresh() {
    this.getDevices();
  }

  updateDevice(device) {
    this.devicesListSubs = this.devicesApi
      .updateDevice(device)
      .subscribe(res => {
        this.openSnackBar("Update effectuée !", "Fermer");
        
      }, err => this.openSnackBar("Erreur de requete ", "Fermer"));
  }
  deleteDevice(deviceName) {
    this.devicesApi.deleteDevice(deviceName).subscribe(res => {
      this.openSnackBar("Appareil supprimé !", "Fermer");
    }, console.error);
    this.getDevices();
  }
  lockDevice(name) {
    var command = {
      type: "LOCK",
    };
    this.devicesApi.commandDevice(name, command).subscribe(res => {
      this.openSnackBar("Verrouillage appliqué !", "Fermer");
    }, err => this.openSnackBar("Erreur de lock", "Fermer"));
  }
  rebootDevice(name) {
    var command = {
      type: "REBOOT"
    };
    this.devicesApi.commandDevice(name, command).subscribe(res => {
      this.openSnackBar("Reboot effectué", "Fermer");
    }, err => this.openSnackBar("Erreur de reboot", "Fermer"));
  }
  resetPasswordDevice(name) {
    var command = {
      type: "RESET_PASSWORD"
    };
    this.devicesApi.commandDevice(name, command).subscribe(res => {
      this.openSnackBar("Password réinitialisé !", "Fermer");
    }, err => this.openSnackBar("Erreur de password reset", "Fermer"));
  }
}
