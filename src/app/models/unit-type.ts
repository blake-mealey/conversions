import { Unit } from './unit';

export class UnitType {
  static readonly AREA = new UnitType('Area', [
    Unit.METRE
  ], Unit.METRE);
  static readonly DATA_TRANSFER_RATE = new UnitType('Data Transfer Rate', [
    Unit.METRE
  ], Unit.METRE);
  static readonly DIGITAL_STORAGE = new UnitType('Digital Storage', [
    Unit.METRE
  ], Unit.METRE);
  static readonly ENERGY = new UnitType('Energy', [
    Unit.METRE
  ], Unit.METRE);
  static readonly FREQUENCY = new UnitType('Frequency', [
    Unit.METRE
  ], Unit.METRE);
  static readonly FUEL_ECONOMY = new UnitType('Fuel Economy', [
    Unit.METRE
  ], Unit.METRE);
  static readonly LENGTH = new UnitType('Distance', [
    Unit.KILOMETRE,
    Unit.METRE,
    Unit.DECIMETRE,
    Unit.CENTIMETRE,
    Unit.MILLIMETRE,
    Unit.MICROMETRE,
    Unit.NANOMETRE,
    Unit.MILE,
    Unit.YARD,
    Unit.FOOT,
    Unit.INCH,
    Unit.NAUTICAL_MILE
  ], Unit.METRE);
  static readonly MASS = new UnitType('Mass', [
    Unit.METRE
  ], Unit.METRE);
  static readonly PLANE_ANGLE = new UnitType('Plane Angle', [
    Unit.METRE
  ], Unit.METRE);
  static readonly PRESSURE = new UnitType('Pressure', [
    Unit.METRE
  ], Unit.METRE);
  static readonly SPEED = new UnitType('Speed', [
    Unit.METRE
  ], Unit.METRE);
  static readonly TEMPERATURE = new UnitType('Temperature', [
    Unit.METRE
  ], Unit.METRE);
  static readonly TIME = new UnitType('Time', [
    Unit.METRE
  ], Unit.METRE);
  static readonly VOLUME = new UnitType('Volume', [
    Unit.METRE
  ], Unit.METRE);
  static readonly ALL_UNIT_TYPES = [
    UnitType.AREA, UnitType.DATA_TRANSFER_RATE, UnitType.DIGITAL_STORAGE, UnitType.ENERGY,
    UnitType.FREQUENCY, UnitType.FUEL_ECONOMY, UnitType.LENGTH, UnitType.MASS, UnitType.PLANE_ANGLE,
    UnitType.PRESSURE, UnitType.SPEED, UnitType.TEMPERATURE, UnitType.TIME, UnitType.VOLUME
  ];

  public displayName: string;
  public units: Array<Unit>;

  public readonly defaultUnit: Unit;

  constructor(displayName: string, units: Array<Unit>, defaultUnit: Unit) {
    this.displayName = displayName;
    this.units = units;
    this.defaultUnit = defaultUnit;

    if (this.units.indexOf(this.defaultUnit) < 0) {
      throw new Error('Default unit must be a member of units.');
    }
  }

  validUnit(unit: Unit) {
    return this.units.indexOf(unit) > -1;
  }
}
