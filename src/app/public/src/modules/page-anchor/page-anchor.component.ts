import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Input,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';

import { StacheNavLink } from '../nav';
import { StacheTableOfContentsService } from '../table-of-contents/table-of-contents.service';
import { StacheWindowRef } from '../shared';

@Component({
  selector: 'stache-page-anchor',
  templateUrl: './page-anchor.component.html',
  styleUrls: ['./page-anchor.component.scss']
})
export class StachePageAnchorComponent implements OnInit, StacheNavLink, AfterViewInit {

  @Input()
  public name: string;
  public fragment: string;
  public path: string[];

  public constructor(
    private router: Router,
    private elementRef: ElementRef,
    private windowRef: StacheWindowRef,
    private cdRef: ChangeDetectorRef,
    private contentsService: StacheTableOfContentsService) {}

  public ngOnInit(): void {
    this.fragment = this.getFragment();
    this.path = [this.router.url.split('#')[0]];
    this.registerAnchor();
  }

  public addHashToUrl(): void {
    let domRect = this.elementRef.nativeElement.getBoundingClientRect();
    this.windowRef.nativeWindow.scroll(0, domRect.y);
    this.windowRef.nativeWindow.location.hash = this.fragment;
  }

  public ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  private getFragment(): string {
    return this.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  private registerAnchor(): void {
    this.contentsService.addPageAnchor({
      path: this.path,
      name: this.name,
      fragment: this.fragment
    } as StacheNavLink);
  }
}
