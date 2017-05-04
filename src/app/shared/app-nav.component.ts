import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html'
})
export class AppNavComponent {
  public nav = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Learn',
      path: '/learn'
    },
    {
      name: 'Components',
      path: '/components'
    },
    {
      name: 'Contribute',
      path: '/contribute'
    }
  ];
}
