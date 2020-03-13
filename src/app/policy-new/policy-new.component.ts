import { Component, OnInit } from "@angular/core";
import { FLASKAPIService } from "../flask-api.service";
import { ActivatedRoute } from "@angular/router";
import { clients } from "../client-list/clients";
import { Policy, installTypeValues } from "../policies-list/policies.model";

@Component({
  selector: "app-policy-new",
  templateUrl: "./policy-new.component.html",
  styleUrls: ["./policy-new.component.css"]
})
export class PolicyNewComponent implements OnInit {
  client;
  clientId;
  policy : Policy[];
  policy_name;
  constructor(
    private route: ActivatedRoute,
    private devicesApi: FLASKAPIService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.client = clients[+params.get("clientId")];
      this.clientId = params.get("clientId");
    });
    this.policy = new Policy();
    this.policy_name = this.client.entreprise_name + "/policies/POLICY_NAME";
  }
  Envoyer()
  {
    console.log(this.policy.name);
    this.devicesApi.createPolicy(this.policy)
    ._subscribe(res => {
      console.log(res);
    }, console.error);
  }
}
