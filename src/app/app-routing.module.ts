import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagerComponent } from './components/manager/manager.component';
import { ProofOfConceptComponent } from './components/proof-of-concept/proof-of-concept.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'manager', component: ManagerComponent, data: { title: 'Manager' } },
  { path: 'poc', component: ProofOfConceptComponent, data: { title: 'Proof of Concept' } },
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
