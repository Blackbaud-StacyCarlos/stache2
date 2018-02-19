import { StacheAnchorService } from './anchor.service';

describe('StacheTableOfContentsService', () => {
  let tocService: StacheAnchorService;
  let anchor: {
    path: 'Test Path'
    name: 'Test Name',
    fragment: 'Test Fragment'
  };

  beforeEach(() => {
    tocService = new StacheAnchorService();
  });

  it('should add anchor to stream', () => {
    tocService.addPageAnchor(anchor);
    let subscription = tocService.anchorStream.subscribe(link =>
      expect(link.name).toBe(anchor.name)
    );
    subscription.unsubscribe();
  });
});
