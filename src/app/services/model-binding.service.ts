import { Injectable } from '@angular/core';
import { CONVERSIONS_SERVER } from '../../../config/appsettings'
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

@Injectable()
export class ModelBindingService {
  constructor() {}

  public bindModelToArray<T>(classType: ClassType<T>, model: any): T[] {
    return plainToClass(classType, model, {
      // TODO: Uncomment once a new NPM version becomes available. See: https://github.com/typestack/class-transformer/issues/198
      // excludeExtraneousValues: true
    });
  }

  public bindModelToObject<T>(classType: ClassType<T>, model: any): T {
    let array = this.bindModelToArray(classType, model);
    if (Array.isArray(array)) {
      return array[0];
    } else {
      return array;
    }
  }
}
