import { Routes } from '@angular/router';
import { Step1Component } from './step1/step1.component';

export const routes: Routes = [
    { path: 'step1', component: Step1Component},
    { path: 'step2', component: Step1Component},
    { path: 'step3', component: Step1Component},
    { path: '', redirectTo: 'step1', pathMatch:'full'}
];
