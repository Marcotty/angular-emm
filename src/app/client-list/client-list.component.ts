import { Component, OnInit } from "@angular/core";
import { Client } from "./clients";
import { FLASKAPIService } from "../flask-api.service";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.css"]
})
export class ClientListComponent implements OnInit {
  clientsDB : Client[]; //clients chargés depuis la base de données
  clientsDBSub : Subscription;
  constructor(private devicesApi: FLASKAPIService,
              private _snackBar: MatSnackBar
  ) {}
  //Méthode appelée à la construction de la page
  ngOnInit() {
    //console.log("Clients chargés");
    this.getClients();
  }
  // Message affiché en bas d'écran
  // ARGs : le message et une action
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
  //Méthode qui permet d'appeler le service qui récupère les infos des clients depuis la base de données clients
  getClients() {
    this.clientsDBSub = this.devicesApi
      .getClients()
      .subscribe(res => {
        this.clientsDB = res;
        this.openSnackBar("Clients chargés !", "Fermer");
        //console.log("clients chargés depuis DB" + JSON.stringify(this.clientsDB));
      }, err => this.openSnackBar("Erreur de chargement", "Fermer"));
  }  
  //Méthode lancée à l'appui sur le bouton Rafraichir
  refresh() {
    this.getClients();
  }

  gerer() {}
}
