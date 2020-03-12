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
  @Output() valueChanged = new EventEmitter<string> ();
  ngOnInit() {
    console.log( this.value);
  }
  update()
  {
    console.log(this.property + ":" + this.value);
    if(this.value == "Désactivé")
    {
      this.valueChanged.emit('true');
    }
    else if (this.value == "Activé")
    {
      this.valueChanged.emit('false');
    }
    else
    {
      this.valueChanged.emit('undefined');
    }
    
  }
}