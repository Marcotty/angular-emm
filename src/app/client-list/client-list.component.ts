import { Component, OnInit } from "@angular/core";

import { clients } from "./clients";
import { FLASKAPIService } from "../flask-api.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.css"]
})
export class ClientListComponent implements OnInit {
  clients = clients;
  clientsDB;
  clientsDBSub;
  constructor(private devicesApi: FLASKAPIService) {}

  ngOnInit() {
    console.log("Clients chargés");
  }

  getClients() {
    this.clientsDBSub = this.devicesApi
      .getClients()
      .subscribe(res => {
        this.clientsDB = res;
        console.log("clients chargés");
      }, console.error);
  }
  refresh() {
    this.getClients();
  }

  gerer() {}
}
