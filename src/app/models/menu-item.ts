export class MenuItem {
  displayName: string;
  data: any;

  constructor(displayName: string, data: any) {
    this.displayName = displayName;
    this.data = data;
  }

  static fromArray(array: Array<any>, displayNameProp: string = 'displayName'): Array<MenuItem> {
    let menuItems = [];
    for (let item of array) {
      menuItems.push(new MenuItem(item[displayNameProp], item))
    }
    return menuItems;
  }
}
