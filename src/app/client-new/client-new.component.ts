import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FLASKAPIService } from "../flask-api.service";
import { Client } from "../client-list/clients";
import { Subscription } from "rxjs";

@Component({
  selector: "app-client-new",
  templateUrl: "./client-new.component.html",
  styleUrls: ["./client-new.component.css"]
})
export class ClientNewComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = true;
  client: Client;
  iconeurl = "https://img.icons8.com/pastel-glyph/64/000000/test-tube.png";
  fileToUpload: File = null;
  idProjet;
  lienSub = "";
  lienName ="";
  token;
  enterprise_name;
  constructor(
    private _formBuilder: FormBuilder,
    private Api: FLASKAPIService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ["", Validators.required],
      desc: ["", Validators.required],
      icone: [""]
    });
    this.secondFormGroup = this._formBuilder.group({
      ent: ["", Validators.required],
      idProjet: ["", Validators.required],
      token: ["", Validators.required],
      key: ["", Validators.required],
      mail: ["", Validators.required]
    });
  }
  uploadFileToActivity() {
    this.Api.postFile(this.fileToUpload).subscribe(
      data => {
        // do something, if upload success
      },
      error => {
        console.log(error);
      }
    );
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(
      "fichier ajouté : " +
        this.fileToUpload.name +
        " fichier : " +
        JSON.stringify(this.fileToUpload)
    );
  }
  createEntreprise()
  {
    var name = this.firstFormGroup.get("name").value;
    var id = this.secondFormGroup.get("idProjet").value;
    var token = this.secondFormGroup.get("token").value;
    this.Api.createEntreprise(name, id, this.fileToUpload.name, token, this.lienName).subscribe(res => {
      console.log("Requete envoyee");
      console.log(res);
      this.enterprise_name = res.name; 
      console.log(JSON.stringify(res))
    }, console.error);
    console.log("entreprise créee");
  }
  getSignupUrl() {
    var name = this.firstFormGroup.get("name").value;
    var id = this.secondFormGroup.get("idProjet").value;
    this.Api.getSignupUrl(name, id, this.fileToUpload.name, this.fileToUpload).subscribe(res => {
      console.log("Requete envoyee");
      console.log(res);
      this.token = res;
      this.lienSub = res.url;
      this.lienName = res.name;
      console.log("lien : " + this.lienSub);
      console.log(JSON.stringify(res))
    }, console.error);
    console.log("client ajouté");
  }
  addClient() {
    //console.log(this.firstFormGroup.get('name').value);

    var obj: Client = {
      NAME: this.firstFormGroup.get("name").value,
      ENTERPRISE_NAME: this.secondFormGroup.get("ent").value,
      DESCRIPTION: this.firstFormGroup.get("desc").value,
      KEY_PATH: this.fileToUpload.name,
      ICONE: this.firstFormGroup.get("icone").value,
      GMAIL: this.secondFormGroup.get("mail").value,
      COUNT: 0,
      IDPROJET :  this.secondFormGroup.get("idProjet").value,
    };
    //this.client = JSON.parse(obj);
    this.Api.newClient(obj).subscribe(res => {
      this.client = res;
      console.log("Requete envoyee");
    }, console.error);
    console.log("client ajouté");
  }
}
