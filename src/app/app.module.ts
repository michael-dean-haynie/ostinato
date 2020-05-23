import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DurationPickerComponent } from './components/duration-picker/duration-picker.component';
import { ManagerComponent } from './components/manager/manager.component';
import { NotifyDialogContentComponent } from './components/notify-dialog-content/notify-dialog-content.component';
import { ProofOfConceptComponent } from './components/proof-of-concept/proof-of-concept.component';
import { DurationPipe } from './pipes/duration.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ProofOfConceptComponent,
    DashboardComponent,
    ManagerComponent,
    DurationPickerComponent,
    NotifyDialogContentComponent,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,

    // Angular Material
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule

  ],
  entryComponents: [
    NotifyDialogContentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
