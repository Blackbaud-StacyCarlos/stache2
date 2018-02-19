import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StacheTitleService } from './title.service';
import { StachePageAnchorModule } from '../page-anchor';
import { StacheLayoutModule } from '../layout';
import { StacheAnalyticsModule } from '../analytics';

import { StacheWrapperComponent } from './wrapper.component';
import { StacheAnchorService } from './anchor.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StacheAnalyticsModule,
    StachePageAnchorModule,
    StacheLayoutModule
  ],
  declarations: [
    StacheWrapperComponent
  ],
  exports: [
    StacheWrapperComponent
  ],
  providers: [
    StacheTitleService,
    StacheAnchorService
  ]
})
export class StacheWrapperModule { }
