import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionsService } from 'src/app/shared/services/actions/actions.service';
import { environment } from 'src/environments/environment';

import { IActionsResponse } from '../../shared/interfaces/actions/actions.interface';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {


  public actionsList: Array<IActionsResponse> = [];

  constructor(
    private actionsService: ActionsService,
  ) { }

  ngOnInit(): void {

    this.loadActions();
    
    
  }

  loadActions():void{
    this.actionsService.getAll().subscribe(data=>
      this.actionsList = data 
  )}
  
  // getAct(): void{
  //   this.list = this.act.getAll().subscribe(data=>
  //     this.list.data);
    
    

  // }



}
