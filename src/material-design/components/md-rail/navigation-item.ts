export class NavigationItem {
  constructor(public readonly displayName: string,
              public readonly iconName: string,
              public readonly route: Array<string>,
              public readonly routeMatch: RegExp) {}
}
