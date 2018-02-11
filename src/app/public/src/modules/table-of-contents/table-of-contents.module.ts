import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StacheNavModule } from '../nav';
import { StacheTableOfContentsComponent } from './table-of-contents.component';
import { StacheTableOfContentsService } from './table-of-contents.service';

@NgModule({
  declarations: [
    StacheTableOfContentsComponent
  ],
  imports: [
    CommonModule,
    StacheNavModule
  ],
  exports: [
    StacheTableOfContentsComponent
  ],
  providers: [
    StacheTableOfContentsService
  ]
})
export class StacheTableOfContentsModule { }
