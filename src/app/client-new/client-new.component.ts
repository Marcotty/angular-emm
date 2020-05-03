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
  createEntreprise() {
    var name = this.firstFormGroup.get("name").value;
    this.Api.createEntreprise(name, this.fileToUpload.name, this.fileToUpload).subscribe(res => {
      console.log("Requete envoyee");
    }, console.error);
    console.log("client ajouté");
  }
  addClient() {
    //console.log(this.firstFormGroup.get('name').value);

    var obj: Client = {
      name: this.firstFormGroup.get("name").value,
      ent: this.secondFormGroup.get("ent").value,
      desc: this.firstFormGroup.get("desc").value,
      key_path: this.secondFormGroup.get("key").value,
      icone: this.secondFormGroup.get("icone").value,
      mail: this.secondFormGroup.get("mail").value,
      count: 0
    };
    //this.client = JSON.parse(obj);
    this.Api.newClient(obj).subscribe(res => {
      this.client = res;
      console.log("Requete envoyee");
    }, console.error);
    console.log("client ajouté");
  }
}
