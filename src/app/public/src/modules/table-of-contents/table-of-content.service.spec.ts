import { StacheTableOfContentsService } from './table-of-contents.service';

describe('StacheTableOfContentsService', () => {
  let tocService: StacheTableOfContentsService;
  let anchor: {
    path: 'Test Path'
    name: 'Test Name',
    fragment: 'Test Fragment'
  };

  beforeEach(() => {
    tocService = new StacheTableOfContentsService();
  });

  it('should add anchor to stream', () => {
    tocService.addPageAnchor(anchor);
    let subscription = tocService.navLinkStream.subscribe(link =>
      expect(link.name).toBe(anchor.name)
    );
    subscription.unsubscribe();
  });
});
