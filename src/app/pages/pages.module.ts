import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';


// Page Route
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
  ],
  exports:[

  ]
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
