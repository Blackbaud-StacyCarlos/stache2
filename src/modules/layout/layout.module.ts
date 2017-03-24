import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StacheNavModule } from '../nav/nav.module';
import { StacheGridModule } from '../grid/grid.module';
import { StachePageHeaderModule } from '../page-header/page-header.module';
import { StachePageAnchorModule } from '../page-anchor/page-anchor.module';
import { StachePageSummaryModule } from '../page-summary/page-summary.module';

import { StacheContainerComponent } from './container.component';
import { StacheLayoutComponent } from './layout.component';
import { StacheLayoutBlankComponent } from './layout-blank.component';
import { StacheLayoutDefaultComponent } from './layout-default.component';
import { StacheLayoutSidebarComponent } from './layout-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    StacheGridModule,
    StacheNavModule,
    StachePageSummaryModule,
    StachePageHeaderModule,
    StachePageAnchorModule
  ],
  declarations: [
    StacheContainerComponent,
    StacheLayoutComponent,
    StacheLayoutBlankComponent,
    StacheLayoutDefaultComponent,
    StacheLayoutSidebarComponent
  ],
  exports: [
    StacheContainerComponent,
    StacheLayoutComponent,
    StacheLayoutBlankComponent,
    StacheLayoutDefaultComponent,
    StacheLayoutSidebarComponent
  ],
  providers: []
})
export class StacheLayoutModule { }
