import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { clients } from "../client-list/clients";
import { FLASKAPIService } from "../flask-api.service";
import { Device, DeviceState } from "./device.model";

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
  inscription = false;
  enterprise_name;
  name;
  QR_code:string;
  constructor(
    private route: ActivatedRoute,
    private devicesApi: FLASKAPIService
  ) {}

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
        this.devicesList = res;
        console.log("devices de " + this.enterprise_name + " chargés");
      }, console.error);
  }
  refresh() {
    this.getDevices();
  }

  updateDevice(device) {
    this.devicesListSubs = this.devicesApi
      .updateDevice(device)
      .subscribe(res => {
        console.log("Update effectuée");
      }, console.error);
  }
  deleteDevice(deviceName) {
    this.devicesApi.deleteDevice(deviceName).subscribe(res => {
      console.log("Suppression de " + "deviceName effectuée");
    }, console.error);
    this.getDevices();
  }
  lockDevice(name)
  {
    var now = (new Date()).toISOString();
    var command = {
      "type": "LOCK",
      "createTime": now
    }
    this.devicesApi.commandDevice(name, command).subscribe(res => {
      console.log("Suppression de " + "deviceName effectuée");
    }, console.error);
  }
  rebootDevice(name)
  {
    var command = {
      "type": "REBOOT"
    }
    this.devicesApi.commandDevice(name, command).subscribe(res => {
      console.log("Suppression de " + "deviceName effectuée");
    }, console.error);
  }
  resetPasswordDevice(name)
  {
    var command = {
      "type": "RESET_PASSWORD"
    }
    this.devicesApi.commandDevice(name, command).subscribe(res => {
      console.log("Suppression de " + "deviceName effectuée");
    }, console.error);
  }
}
