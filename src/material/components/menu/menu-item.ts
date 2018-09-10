export class MenuItem {
  displayName: string;
  icon: string;

  data: any;

  constructor(data: any, displayName: string, icon: string = undefined) {
    this.displayName = displayName;
    this.icon = icon;

    this.data = data;
  }

  static fromArray(array: Array<any>, displayNameProp: string = 'displayName',
                   iconNameProp: string = 'icon'): Array<MenuItem> {

    let menuItems = [];
    for (let item of array) {
      menuItems.push(new MenuItem(item, item[displayNameProp], item[iconNameProp]))
    }
    return menuItems;
  }
}
