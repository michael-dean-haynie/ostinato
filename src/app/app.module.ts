import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DurationPickerComponent } from './components/duration-picker/duration-picker.component';
import { ManagerComponent } from './components/manager/manager.component';
import { NotifyDialogContentComponent } from './components/notify-dialog-content.component';
import { ProofOfConceptComponent } from './components/proof-of-concept/proof-of-concept.component';


@NgModule({
  declarations: [
    AppComponent,
    ProofOfConceptComponent,
    DashboardComponent,
    ManagerComponent,
    DurationPickerComponent
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
    MatCheckboxModule

  ],
  entryComponents: [
    NotifyDialogContentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
