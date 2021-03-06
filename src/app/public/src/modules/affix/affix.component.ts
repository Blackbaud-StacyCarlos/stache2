import {
  ChangeDetectorRef,
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { StacheAffixTopDirective } from './affix-top.directive';
import { StacheWindowRef } from '../shared';

@Component({
  selector: 'stache-affix',
  templateUrl: './affix.component.html',
  styleUrls: ['./affix.component.scss']
})
export class StacheAffixComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stacheAffixWrapper')
  public wrapper: ElementRef;
  public minHeightFormatted: string;
  public maxWidthFormatted: string;

  @ViewChild(StacheAffixTopDirective)
  public affixTopDirective: StacheAffixTopDirective;

  private windowSubscription: Subscription;

  public constructor(
    private windowRef: StacheWindowRef,
    private cdRef: ChangeDetectorRef) {
      this.windowSubscription = this.windowRef.onResize$.subscribe(() => {
        this.setElementRefDimensions();
      });
    }

  public ngAfterViewInit() {
    this.setElementRefDimensions();
    this.cdRef.detectChanges();
  }

  public ngOnDestroy(): void {
    this.windowSubscription.unsubscribe();
  }

  public getStyles(): any {
    return {
      'min-height': this.getCssMinHeight(),
      'max-width': this.getCssMaxWidth(),
      position: this.getCssPosition()
    };
  }

  private setElementRefDimensions(): void {
    if (this.wrapper) {
      this.minHeightFormatted = `${this.wrapper.nativeElement.offsetHeight}px`;
      this.maxWidthFormatted = `${this.wrapper.nativeElement.offsetWidth}px`;
    }
  }

  private getCssPosition(): string {
    if (this.affixTopDirective.isAffixed) {
      return 'relative';
    }

    return 'static';
  }

  private getCssMinHeight(): string {
    if (this.affixTopDirective.isAffixed) {
      return this.minHeightFormatted;
    }

    return 'auto';
  }

  private getCssMaxWidth(): string {
    if (this.affixTopDirective.isAffixed) {
      return this.maxWidthFormatted;
    }

    return '100%';
  }
}
