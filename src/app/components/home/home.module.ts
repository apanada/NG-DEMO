import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LandingComponent } from './landing/landing.component';

import { sp } from '@pnp/sp';
import { environment } from 'src/environments/environment';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: LandingComponent, data: { breadcrumb: 'Home' } }
];

sp.setup({
  sp: {
    baseUrl: environment.webAbsoluteUrl
  }
});

@NgModule({
  declarations: [LandingComponent, AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }
