import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { clients } from "../client-list/clients";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"]
})
export class ClientDetailsComponent implements OnInit {
  client;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    this.client = clients[+params.get('clientId')];
      }
    );
  }
}
