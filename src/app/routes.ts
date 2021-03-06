import { NavigationItem } from '../material-design/components/md-rail/navigation-item';

export class Routes {
  public static readonly Account = new NavigationItem(
    'Account',
    'person',
    ['/account']);

  public static readonly Conversions = new NavigationItem(
    'Conversions',
    'compare_arrows',
    ['/'],
    /^\/(lists\/[\w\-]{22})?$/);

  public static readonly Lists = new NavigationItem(
    'Lists',
    'list',
    ['/lists']);

  public static readonly Settings = new NavigationItem(
    'Settings',
    'settings',
    ['/settings']);

  public static readonly All: Array<NavigationItem> = [
    // Routes.Account,
    Routes.Conversions,
    Routes.Lists,
    // Routes.Settings
  ];
}
