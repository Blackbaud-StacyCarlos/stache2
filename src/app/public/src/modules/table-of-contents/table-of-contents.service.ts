import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { StacheNavLink } from '../nav';

@Injectable()
export class StacheTableOfContentsService {

    private navLink = new Subject<StacheNavLink>();
    public navLinkStream = this.navLink.asObservable();

    public addPageAnchor(anchor: StacheNavLink) {
        this.navLink.next(anchor);
    }
}
