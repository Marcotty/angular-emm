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
  enterprise_name;
  constructor(
    private route: ActivatedRoute,
    private flaskApi: FLASKAPIService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //this.client = clients[+params.get("clientId")];
      this.enterprise_name = params.get("enterprise_name");
    });
    this.enterpriseSubs = this.flaskApi.getEnterprise(this.enterprise_name).subscribe(res => {
      this.enterprise = res;
      console.log("enterprise chargée");
    }, console.error);
  }
}
