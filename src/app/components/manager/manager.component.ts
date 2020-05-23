import { Component, OnInit } from '@angular/core';
import { ReminderService } from 'src/app/services/reminder.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  myDataArray = [];
  columnsToDisplay = ['name', 'timeoutDuration', 'waitForAkng', 'autoAkng'];

  constructor(private reminderService: ReminderService) { }

  ngOnInit(): void {
    this.myDataArray = this.reminderService.reminders;
  }

}
