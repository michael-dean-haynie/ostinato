import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderStateService {
  contentHeaderText = new Subject<string>();

  constructor(private router: Router) {
    // listen for routing events to push updates to header text subjects
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const data = this.getRouteData();
        if (data && data.title) {
          this.contentHeaderText.next(data.title);
        }
      }
    });
  }

  private getRouteData(): any {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data;
  }
}
