import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Client } from "../client-list/clients";
import { FLASKAPIService } from "../flask-api.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"]
})
export class ClientDetailsComponent implements OnInit {
  clientDB: Client; //clients chargés depuis la base de données
  clientDBSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private devicesApi: FLASKAPIService
  ) {}
  name;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.name = params.get("name");
    });
  }
  getClients() {
    this.clientDBSub = this.devicesApi
      .getClient(this.name)
      .subscribe(res => {
        this.clientDB = res;
        console.log("client chargé depuis DB" + this.clientDB);
      }, console.error);
  }
}
