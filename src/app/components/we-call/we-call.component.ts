import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-we-call',
  templateUrl: './we-call.component.html',
  styleUrls: ['./we-call.component.scss']
})
export class WeCallComponent implements OnInit {

  public weCallForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initWeCallForm()
  }

  initWeCallForm():void{
    this.weCallForm = this.fb.group({
      name: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]]
    })
  }

}
