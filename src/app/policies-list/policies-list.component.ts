import { Component, OnInit } from "@angular/core";
import { FLASKAPIService } from "../flask-api.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { clients } from "../client-list/clients";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  Policy,
  installTypeValues,
  appAutoUpdateValues,
  defaultPermissionValues,
  boolDisabled,
  keyguardFeature,
  locationMode,
  encryptionPolicy,
  playStoreMode
} from "./policies.model";
@Component({
  selector: "app-policies-list",
  templateUrl: "./policies-list.component.html",
  styleUrls: ["./policies-list.component.css"]
})
export class PoliciesListComponent implements OnInit {
  client; //infos du client
  clientId; //id du client
  enterprise_name;
  name;
  policiesListSubs: Subscription;
  policies: Policy[]; //la liste des politiques
  //Variables obligatoires pour obtenir les infos des énumérations
  installTypeValues = installTypeValues;
  appAutoUpdateValues = appAutoUpdateValues;
  boolDisabled = boolDisabled;
  defaultPermissionValues = defaultPermissionValues;
  keyguardFeature = keyguardFeature;
  locationMode = locationMode;
  encryptionPolicy = encryptionPolicy;
  playStoreMode = playStoreMode;
  noPolitiques: boolean = false;

  QR_code: string[] = [];
  inscriptionAuto = false; //paramètre à activer pour que le code QR soit demandé automatiquement
  constructor(
    private route: ActivatedRoute,
    private devicesApi: FLASKAPIService,
    private _snackBar: MatSnackBar
    
  ) {this.noPolitiques=false;}
  //Méthode appelée à la construction de la page
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.enterprise_name = params.get("enterprise_name");
      this.name = params.get("name");
      //this.clientId = params.get("clientId");
    });
    this.getPolicies();
  }
  //Récupère les politiques depuis le serveur backend
  getPolicies() {
    this.policiesListSubs = this.devicesApi
      .getPolicies(this.enterprise_name)
      .subscribe(
        res => {
          if (res.toString() == "Pas de politiques") {
            console.log("pas de politiques");
            this.noPolitiques = true;
            this.openSnackBar("Pas de politiques trouvées.", "Fermer");
          } else {
            this.noPolitiques = false;
            this.policies = res;
            console.log("politiques chargées : " + res);
            if (this.inscriptionAuto) {
              for (let i = 0; i < this.policies.length; i++) {
                this.inscription(i);
              }
            }
          }
        },
        err => console.log("erreur")
      );
  }
  //Permet la sauvegarde des modifications appliquées à une politique
  //ARGUMENT : l'id de la politique
  update(policyId) {
    this.openSnackBar("Mise à jour en cours", "Fermer");
    this.devicesApi.updatePolicy(this.policies[policyId]).subscribe(res => {
      //this.policies[policyId] = res;
      this.openSnackBar("Mise à jour réussie", "Fermer");
    }, console.error);
  }
  // Message affiché en bas d'écran
  // ARGs : le message et une action
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
  // Demande de code QR pour une inscriton à une politique
  // ARG : l'id de la politique
  inscription(policyId) {
    this.devicesApi
      .inscriptionPolicy(this.policies[policyId].name)
      .subscribe(res => {
        this.QR_code[policyId] = res;
        console.log("QR_code[" + policyId + "] reçu " + this.QR_code[policyId]);
      }, console.error);
  }

  //méthode de suppression d'une politique
  //ARG : nom de la politique à supprimer
  delete(policyName) {
    this.devicesApi.deletePolicy(policyName).subscribe(res => {
      console.log("Suppression effectuée");
    }, console.error);
    this.refresh();
  }
  //méthode qui recharge les politiques
  refresh() {
    this.getPolicies();
  }
  //méthode d'ajout d'application en dernière position
  // ARG : id de la politique
  addAppli(policyId) {
    this.policies[policyId].applications.push(
      JSON.parse(
        '{"packageName":"com.tcx.sipphone14","installType": "AVAILABLE"}'
      )
    );
  }
  //supprime une application, et regroupe le reste des applications
  //ARGS : id de la politique, id de l'application
  delApp(policyId, appId) {
    this.policies[policyId].applications.splice(appId, 1);
  }
  //méthode de création de réseau wifi DEBUG
  // ARGS :  infos du réseau
  createNetwork(
    policyId,
    guid: string,
    name: string,
    ssid: string,
    type: string,
    cle: string
  ) {
    console.log("guid : " + guid);
    console.log("name : " + name);
    console.log("ssid" + ssid);
    console.log("type : " + type);
    console.log("cle : " + cle);
    this.policies[policyId].openNetworkConfiguration.NetworkConfigurations.push(
      JSON.parse(
        '{"guid" : "a", "Name":"a", "Type":"WiFi", "WiFi": {"SSID":"ssid", "Security":"WPA-PSK", "Passphrase":"cle"}}'
      )
    );
    console.log(
      "network : " +
        this.policies[policyId].openNetworkConfiguration
          .NetworkConfigurations[0].GUID
    );
  }
}
