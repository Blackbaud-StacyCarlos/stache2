import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { expect } from '@blackbaud/skyux-builder/runtime/testing/browser';

import { StachePageAnchorTestComponent } from './fixtures/page-anchor.component.fixture';
import { StachePageAnchorComponent } from './page-anchor.component';
import { StacheWindowRef } from '../shared';

import { StacheAnchorService } from '../wrapper/anchor.service';

describe('StachePageAnchorComponent', () => {
  let component: StachePageAnchorComponent;
  let fixture: ComponentFixture<StachePageAnchorComponent>;
  let debugElement: DebugElement;
  let mockAnchorService: any;

  let testDebugElement: DebugElement;
  let testFixture: ComponentFixture<StachePageAnchorTestComponent>;

  class MockAnchorService {
    public addPageAnchor = jasmine.createSpy('addPageAnchor');
  }

  beforeEach(() => {
    mockAnchorService = new MockAnchorService();

    TestBed.configureTestingModule({
      declarations: [
        StachePageAnchorComponent,
        StachePageAnchorTestComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        StacheWindowRef,
        { provide: StacheAnchorService, useValue: mockAnchorService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StachePageAnchorComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    testFixture = TestBed.createComponent(StachePageAnchorTestComponent);
    testDebugElement = testFixture.debugElement;
  });

  it('should display transcluded content', () => {
    testFixture.detectChanges();
    const heading = testDebugElement.nativeElement.querySelector('.stache-page-anchor-heading');
    expect(heading).toHaveText('Test Content');
  });

  it('should add the fragment as an id to the element', () => {
    testFixture.detectChanges();
    const id = testDebugElement.nativeElement
      .querySelector('.stache-page-anchor')
      .getAttribute('id');
    expect(id).toBe('test-content');
  });

  it('should call the addHashToUrl method when the icon is clicked', async(() => {
    spyOn(component, 'addHashToUrl');
    const icon = debugElement.nativeElement.querySelector('.stache-page-anchor-icon');
    icon.click();
    fixture.whenStable()
      .then(() => {
        expect(component.addHashToUrl).toHaveBeenCalled();
      });
  }));

  it('should call getBoundingClientRect on the heading when clicked, and scroll the window', async(() => {
    spyOn(debugElement.nativeElement, 'getBoundingClientRect').and.callFake(() => { return { y: 0 }; });
    component.addHashToUrl();
    fixture.whenStable()
      .then(() => {
        expect(debugElement.nativeElement.getBoundingClientRect).toHaveBeenCalled();
      });
  }));

  it('should broadcast changes', () => {
    testFixture.detectChanges();
    expect(mockAnchorService.addPageAnchor).toHaveBeenCalled();
  });
});
