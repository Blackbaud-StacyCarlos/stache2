import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { StacheNavLink } from '../nav';

@Injectable()
export class StacheAnchorService {

    private anchor = new Subject<StacheNavLink>();
    public anchorStream = this.anchor.asObservable();

    public addPageAnchor(anchor: StacheNavLink) {
        this.anchor.next(anchor);
    }
}
