export class Unit {
  //region Length Units
  static readonly KILOMETRE = new Unit('Kilometre', 'km', 1000);
  static readonly METRE = new Unit('Metre', 'm', 1);
  static readonly DECIMETRE = new Unit('Decimetre', 'dm', 0.1);
  static readonly CENTIMETRE = new Unit('Centimetre', 'cm', 0.01);
  static readonly MILLIMETRE = new Unit('Millimetre', 'mm', 0.001);
  static readonly MICROMETRE = new Unit('Micrometre', 'μm', 1e-6);
  static readonly NANOMETRE = new Unit('Nanometre', 'nm', 1e-9);
  static readonly MILE = new Unit('Mile', 'mi', 1609.34);
  static readonly YARD = new Unit('Yard', 'yd', 0.9144);
  static readonly FOOT = new Unit('Foot', 'ft', 0.3048);
  static readonly INCH = new Unit('Inch', 'in', 0.0254);
  static readonly NAUTICAL_MILE = new Unit('Nautical Mile', 'nmi', 1852);
  //endregion

  displayName: string;
  symbol: string;
  relativeToDefault: number;
  inverseRelativeToDefault: number;

  constructor(displayName: string, abbreviation: string, relativeToDefault: number) {
    this.displayName = displayName;
    this.symbol = abbreviation;
    this.relativeToDefault = relativeToDefault;
    this.inverseRelativeToDefault = 1 / this.relativeToDefault;
  }
}
