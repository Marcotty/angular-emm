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
  thirdFormGroup: FormGroup;
  isEditable = true;
  client : Client;
  constructor(
    private _formBuilder: FormBuilder,
    private Api: FLASKAPIService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ["", Validators.required],
      desc: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      ent: ["", Validators.required],
      key: ["", Validators.required],
      mail: ["", Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      icone: ["", Validators.required]
    });
  }
  addClient() {
    //console.log(this.firstFormGroup.get('name').value);

      var obj = {
      "name": this.firstFormGroup.get('name').value,
      "ent": this.secondFormGroup.get('ent').value,
      "desc": this.firstFormGroup.get('desc').value,
      "key_path": this.secondFormGroup.get('key').value,
      "icone" : this.thirdFormGroup.get('icone').value,
      "mail" : this.secondFormGroup.get('mail').value,
      "count" : 0
    };
    //this.client = JSON.parse(obj);
    this.Api.newClient(obj)
        .subscribe(res => {
          this.client = res;
          console.log('Requete envoyee');
      }, console.error);
    console.log('client ajouté');
  }
}
