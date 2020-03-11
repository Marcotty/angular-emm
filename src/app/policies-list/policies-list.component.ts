import { Component, OnInit } from '@angular/core';
import { FLASKAPIService } from "../flask-api.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { clients } from "../client-list/clients";
import { Policy, installTypeValues } from "./policies.model";
@Component({
  selector: 'app-policies-list',
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.css']
})
export class PoliciesListComponent implements OnInit {
  client;
  clientId;
  policiesListSubs: Subscription;
  policies: Policy[];
  installTypeValues = installTypeValues;

  constructor(
    private route: ActivatedRoute,
    private devicesApi: FLASKAPIService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.client = clients[+params.get("clientId")];
      this.clientId = params.get("clientId");
    });
    this.policiesListSubs = this.devicesApi.getPolicies(this.client.entreprise_name).subscribe(res => {
      this.policies = res;
      console.log("politiques chargées");

    }, console.error);
  }

}