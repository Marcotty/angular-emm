import { Component, OnInit } from "@angular/core";
import { FLASKAPIService } from "../flask-api.service";
import { ActivatedRoute } from "@angular/router";
import { clients } from "../client-list/clients";
import { Policy } from "../policies-list/policies.model";

@Component({
  selector: "app-policy-new",
  templateUrl: "./policy-new.component.html",
  styleUrls: ["./policy-new.component.css"]
})
export class PolicyNewComponent implements OnInit {
  name;
  enterprise_name;
  policy : Policy[];
  policy_name;
  policy_name_temp;
  constructor(
    private route: ActivatedRoute,
    private devicesApi: FLASKAPIService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.enterprise_name = params.get("enterprise_name");
      this.name = params.get("name");
    });
    this.policy_name = this.enterprise_name + "/policies/POLICY_NAME";
    this.policy_name_temp = this.policy_name;
  }
  Envoyer()
  {
    this.devicesApi.createPolicy(this.policy_name)
    .subscribe(res => {
      console.log('Requete nouvelle politique envoyee');
    }, console.error);
  }
}
