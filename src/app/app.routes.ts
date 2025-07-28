import { Routes } from '@angular/router';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { ViewstudentComponent } from './viewstudent/viewstudent.component';
import { ManagestudentComponent } from './managestudent/managestudent.component';
import { provideRouter } from '@angular/router';
export const routes: Routes = [ { path: 'add', component: AddstudentComponent },
  { path: 'manage', component: ManagestudentComponent },
  { path: 'students', component: ViewstudentComponent  },
  { path: '', redirectTo: 'students', pathMatch: 'full' }];

export const appProviders = [provideRouter(routes)];