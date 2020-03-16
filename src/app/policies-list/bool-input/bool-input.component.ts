import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { boolDisabled } from '../policies.model';
@Component({
  selector: 'app-bool-input',
  templateUrl: './bool-input.component.html',
  styleUrls: ['./bool-input.component.css']
})
export class BoolInputComponent implements OnInit {
  @Input() value: string;
  boolDisabledValues = boolDisabled;
  constructor() { }
  @Input() property: string;
  @Output() valueChanged = new EventEmitter<boolean> ();
  ngOnInit() {
    console.log("Bool component base value : " + this.value);
    if(this.value == "true")
    {
      this.value = "Activé";
    }
    else
    {
      this.value = "Désactivé";
    }
  }
  update(event)
  {
    console.log("Bool component : " + this.property + ":" + this.value + "event : " + event);
    if(this.value == "Désactivé")
    {
      this.valueChanged.emit(true);
    }
    else if (this.value == "Activé")
    {
      this.valueChanged.emit(false);
    }
  }
}