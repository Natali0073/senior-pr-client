import { Component, OnInit } from '@angular/core';
import { UnsubscriberService } from 'src/app/shared/services/unsubscriber.service';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  providers: [UnsubscriberService]
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private readonly unsubscriber: UnsubscriberService,
  ) {
  }

  ngOnInit(): void {
  }

  

}