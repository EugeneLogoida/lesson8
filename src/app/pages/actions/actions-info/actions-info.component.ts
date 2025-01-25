import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionsResponse } from 'src/app/shared/interfaces/actions/actions.interface';
import {ActionsService} from "../../../shared/services/actions/actions.service";

@Component({
  selector: 'app-actions-info',
  templateUrl: './actions-info.component.html',
  styleUrls: ['./actions-info.component.scss']
})
export class ActionsInfoComponent implements OnInit {

  public currentAction!:IActionsResponse

  constructor(
    private activatedRoute: ActivatedRoute,
    // private actionsService: ActionsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.currentAction = response['actionsInfo'];
      console.log(response)
    })

  }


}
