type IsEnabledCallback = () => boolean;

export class MenuItem {

  constructor(public data: any,
              public displayName: string,
              public icon: string = undefined,
              protected isEnabled: IsEnabledCallback = () => true,
              protected callbackContext: any = null) {}

  get enabled(): boolean {
    return this.isEnabled.call(this.callbackContext);
  }

  static fromArray(array: Array<any>, displayNameProp: string = 'displayName',
                   iconProp: string = 'icon', isEnabledProp: string = 'isEnabled'): Array<MenuItem> {

    let menuItems = [];
    for (let item of array) {
      menuItems.push(new MenuItem(item, item[displayNameProp], item[iconProp], item[isEnabledProp], item))
    }
    return menuItems;
  }
}
