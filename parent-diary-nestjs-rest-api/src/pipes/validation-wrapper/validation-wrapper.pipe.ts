import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';
@Injectable()
export class ValidationWrapperPipe
  extends ValidationPipe
  implements PipeTransform
{
  validate(value: any, validatorOptions?: ValidatorOptions) {
    return super.validate(value, validatorOptions);
  }
}
