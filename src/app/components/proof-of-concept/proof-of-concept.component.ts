import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reminder } from 'src/app/reminders/reminder';

@Component({
  selector: 'app-proof-of-concept',
  templateUrl: './proof-of-concept.component.html',
  styleUrls: ['./proof-of-concept.component.scss']
})
export class ProofOfConceptComponent {

  // Reminder List
  reminders: Reminder[] = [];

  // Create Reminder
  message = 'Hey do that thing!';
  duration = 5;

  constructor(private dialogService: MatDialog) { }

  createNewReminder(): void {
    this.reminders.push(new Reminder(this.message, this.duration, this.dialogService));
  }

  toggleActivation(reminder: Reminder): void {
    if (reminder.isActive()) {
      reminder.deactivate();
    } else {
      reminder.activate();
    }
  }

}
