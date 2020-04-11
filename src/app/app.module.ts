import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotifyDialogContentComponent } from './components/notify-dialog-content.component';
import { ProofOfConceptComponent } from './components/proof-of-concept/proof-of-concept.component';


@NgModule({
  declarations: [
    AppComponent,
    ProofOfConceptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,

    // Angular Material
    MatDialogModule
  ],
  entryComponents: [
    NotifyDialogContentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
