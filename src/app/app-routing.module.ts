import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProofOfConceptComponent } from './components/proof-of-concept/proof-of-concept.component';


const routes: Routes = [
  { path: 'poc', component: ProofOfConceptComponent },
  // empty url
  { path: '', pathMatch: 'full', redirectTo: 'poc' },
  // anything else
  { path: '**', redirectTo: 'poc' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
