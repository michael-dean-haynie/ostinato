import { Component, OnInit } from '@angular/core';
import { HeaderStateService } from './services/header-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contentHeaderText;

  constructor(private headerStateService: HeaderStateService) {
    headerStateService.contentHeaderText.subscribe(text => {
      this.contentHeaderText = text;
    });
  }

  ngOnInit() {

  }

}
