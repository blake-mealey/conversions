import { Router } from '@angular/router';

export class NavigationItem {
  constructor(public readonly displayName: string,
              public readonly iconName: string,
              public readonly route: Array<string>,
              public readonly routeMatch: RegExp = undefined) {

    // If no custom route matcher regex is supplied, construct a default one which only matches the
    // exact route
    if (!this.routeMatch) {
      this.routeMatch = new RegExp(`^${route.join('/')}$`);
    }
  }

  public isActive(router: Router): boolean {
    return this.routeMatch.test(router.url);
  }

  public navigate(router: Router): void {
    if (!this.isActive(router)) {
      router.navigate(this.route);
    }
  }
}
