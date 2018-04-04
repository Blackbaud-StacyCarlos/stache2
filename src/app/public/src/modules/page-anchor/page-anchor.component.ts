import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';

import { StacheNavLink } from '../nav';
import { StacheWindowRef } from '../shared';
import { StacheAnchorService } from '../wrapper/anchor.service';

@Component({
  selector: 'stache-page-anchor',
  templateUrl: './page-anchor.component.html',
  styleUrls: ['./page-anchor.component.scss']
})
export class StachePageAnchorComponent implements OnInit, StacheNavLink, AfterViewInit {

  public name: string;
  public fragment: string;
  public path: string[];
  public index: number;

  public constructor(
    private router: Router,
    private elementRef: ElementRef,
    private windowRef: StacheWindowRef,
    private cdRef: ChangeDetectorRef,
    private anchorService: StacheAnchorService) {
      this.name = '';
    }

  public ngOnInit(): void {
    this.name = this.getName();
    this.fragment = this.getFragment();
    this.path = [this.router.url.split('#')[0]];
  }

  public addHashToUrl(): void {
    let domRect = this.elementRef.nativeElement.getBoundingClientRect();
    this.windowRef.nativeWindow.scroll(0, domRect.y);
    this.windowRef.nativeWindow.location.hash = this.fragment;
  }

  public ngAfterViewInit(): void {
    this.cdRef.detectChanges();
    this.name = this.getName();
    this.fragment = this.getFragment();
    this.getIndex();
    this.registerAnchor();
  }

  private getName(): string {
    return this.elementRef.nativeElement.textContent.trim();
  }

  private getFragment(): string {
    return this.name
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  private getIndex(): void {
    let anchors = document.querySelectorAll('stache-page-anchor div');
    for (let i = 0; i < anchors.length; i++) {
      if (this.fragment === anchors[i].id) {
        this.index = i;
        console.log(i);
      }
    }
  }

  private registerAnchor(): void {
    this.anchorService.addPageAnchor({
      path: this.path,
      name: this.name,
      fragment: this.fragment,
      order: this.index
    } as StacheNavLink);
  }
}
