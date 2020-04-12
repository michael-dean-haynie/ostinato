import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  createReminderMessage = '';
  createReminderTimeoutDuration = 0;

  constructor() { }

  ngOnInit(): void {
  }

  // TODO: remove!
  logit(): void {
    console.log(this.createReminderTimeoutDuration);
  }

}
