import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
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
