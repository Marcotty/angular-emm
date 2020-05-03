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
  errorGet = true;
  constructor(
    private route: ActivatedRoute,
    private Api: FLASKAPIService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.name = params.get("name");
    });
    this.getClient();
  }
  error() {
    this.errorGet=false;
    }
  getClient() {
    this.clientSub = this.Api.getClient(this.name).subscribe(res => {
      this.client = res;
      console.log("Détails du client " + res[0].NAME+" chargé depuis DB" + JSON.stringify(this.client) + " name : " + this.client[0].NAME);
    }, this.error);
  }
  modifier()
  {
    this.Api.modifyClient(this.client[0])
        .subscribe(res => {
          console.log('Requete envoyee');
      }, console.error);
    console.log('client ajouté');
  }
  supprimer()
  {
     this.Api.deleteClient(this.client[0].NAME)
        .subscribe(res => {
          console.log('Requete envoyee');
      }, console.error);
    console.log('client ajouté');
  }
}
