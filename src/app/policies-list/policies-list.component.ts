import { Component, OnInit } from "@angular/core";
import { FLASKAPIService } from "../flask-api.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { clients } from "../client-list/clients";
import { Policy, installTypeValues } from "./policies.model";
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
  QR_code: string[] = [];
  inscriptionAuto = false;
  constructor(
    private route: ActivatedRoute,
    private devicesApi: FLASKAPIService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.client = clients[+params.get("clientId")];
      this.clientId = params.get("clientId");
    });
    this.policiesListSubs = this.devicesApi
      .getPolicies(this.client.entreprise_name)
      .subscribe(res => {
        this.policies = res;
        console.log("politiques chargées");
        if(this.inscriptionAuto)
        {
          for (let i = 0; i < this.policies.length; i++) {
          this.inscription(i);
          }
        }
      }, console.error);
  }
  update(policyId) {
    this.devicesApi.updatePolicy(this.policies[policyId]).subscribe(res => {
      //this.policies[policyId] = res;
      console.log("update effectuée");
    }, console.error);
  }
  inscription(policyId) {
    this.devicesApi
      .inscriptionPolicy(this.policies[policyId].name)
      .subscribe(res => {
        this.QR_code[policyId] = res;
        console.log("QR_code[" + policyId + "] reçu " + this.QR_code[policyId]);
      }, console.error);
  }
  onChanged(property : string, value : string)
  {
    console.log("prop : " + property + "changed : " + value);
    property = value;
  }
}
