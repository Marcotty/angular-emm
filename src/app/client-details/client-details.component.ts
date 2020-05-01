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
  client: Client; //client chargé depuis la base de données
  clientSub: Subscription;
  name;
  errorGet = false;
  constructor(
    private route: ActivatedRoute,
    private devicesApi: FLASKAPIService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.name = params.get("name");
    });
    this.getClient();
  }
  error()
  {this.errorGet=true}
  getClient() {
    this.clientSub = this.devicesApi.getClient(this.name).subscribe(res => {
      this.client = res;
      console.log("client " + res.name+" chargé depuis DB" + JSON.stringify(this.client));
    }, this.error);
  }
}
