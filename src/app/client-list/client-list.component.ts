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
  clients = clients; // clients locaux de tests
  clientsDB; //clients chargés depuis la base de données
  clientsDBSub;
  constructor(private devicesApi: FLASKAPIService) {}
  //Méthode appelée à la construction de la page
  ngOnInit() {
    console.log("Clients chargés");
    this.getClients();
  }
  //Méthode qui permet d'appeler le service qui récupère les infos des clients depuis la base de données clients
  getClients() {
    this.clientsDBSub = this.devicesApi
      .getClients()
      .subscribe(res => {
        this.clientsDB = res;
        console.log("clients chargés depuis DB" + this.clientsDB);
      }, console.error);
  }  
  //Méthode lancée à l'appui sur le bouton Rafraichir
  refresh() {
    this.getClients();
  }

  gerer() {}
}
