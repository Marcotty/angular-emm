import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { clients } from "../client-list/clients";
import { FLASKAPIService } from "../flask-api.service";
import { Device } from "./device.model";

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

  constructor(
    private route: ActivatedRoute,
    private devicesApi: FLASKAPIService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.client = clients[+params.get("clientId")];
      this.clientId = params.get("clientId");
    });
    this.getDevices();

  }
  getDevices()
  {
    this.devicesListSubs = this.devicesApi
      .getDevices(this.client.entreprise_name)
      .subscribe(res => {
        this.devicesList = res;
        console.log("devices de " + this.client.entreprise_name + " chargés");
      }, console.error);
  }
  refresh() {
    this.getDevices();
  }
  new()
  {

  }
  deleteDevice(deviceId)
  {

  }
}
