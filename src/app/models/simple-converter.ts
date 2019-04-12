import { Expose, Type } from 'class-transformer';

export class SimpleConverter {
  @Expose() public readonly inputUnitDisplayName: string;

  @Type(() => String)
  @Expose() public readonly outputUnitDisplayNames: Array<string>;
}
