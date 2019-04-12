import { Expose } from 'class-transformer';

export class Unit {
  @Expose() public readonly symbol: string;
  @Expose() public readonly displayName: string;
}
