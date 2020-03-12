import { Component, OnInit } from "@angular/core";
import { FLASKAPIService } from "../flask-api.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { clients } from "../client-list/clients";
import { Enterprise } from "./enterprise.model";
@Component({
  selector: "app-enterprise-details",
  templateUrl: "./enterprise-details.component.html",
  styleUrls: ["./enterprise-details.component.css"]
})
export class EnterpriseDetailsComponent implements OnInit {
  client;
  clientId;
  enterpriseSubs: Subscription;
  enterprise: Enterprise[];

  constructor(
    private route: ActivatedRoute,
    private flaskApi: FLASKAPIService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.client = clients[+params.get("clientId")];
      this.clientId = params.get("clientId");
    });
    this.enterpriseSubs = this.flaskApi.getEnterprise(this.client.entreprise_name).subscribe(res => {
      this.enterprise = res;
      console.log("enterprise chargée");
    }, console.error);
  }
}
