import { Component, OnInit } from '@angular/core';
import { boolDisabled } from '../policies.model';
@Component({
  selector: 'app-bool-input',
  templateUrl: './bool-input.component.html',
  styleUrls: ['./bool-input.component.css']
})
export class BoolInputComponent implements OnInit {
  value;
  boolDisabledValues = boolDisabled;
  constructor() { }

  ngOnInit() {
  }
  update()
  {
    console.log(this.value);
  }
}