import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbedVideo } from 'ngx-embed-video';

import { ProductRoutingModule } from './product-routing.module';
import { ProductHomeComponent } from './product-home/product-home.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ProductHomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ProductRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    FlexLayoutModule,
    EmbedVideo
  ]
})
export class ProductModule { }
