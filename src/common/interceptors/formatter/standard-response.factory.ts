import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { StandardResponseDto } from './standard-response.dto';

// Changes name of `classInst` to `name`.
// if `name` is undefined, assigns a unique value to it.
function changeClassName(classInst, name?: string) {
  const value = name
    ? `Response-Model-${name}`
    : `Response-Model-${uuidv4().toString().replace(/-/g, '')}`;
  // @nestjs/swagger internally makes use of class.name, so name of class has to be unique
  Object.defineProperty(classInst, 'name', {
    value,
  });
}

// Problem: we want a class which has all the properties of `payloadDto`
// and those properties should be decorated by `ApiModelProperty`
// Sln: recursively call `PipeInheritance` with `payloadDto`, `keys`
// (which are the object keys of `payloadDto`) and `PrevClass`
// (which initially is an empty class)
// At each iteration, `PipeInheritance` creates a class with one property:
// first key in `keys` array. then decorates
// This property with `ApiModelProperty`. this class inherits from `PrevClass`
// so it contains all of the previous keys.
// After that, `keys.shift()` is called and that key is removed from the list
// This goes on until there is no key left inside `keys`
function PipeInheritance(payloadDto, keys: string[], PrevClass) {
  if (keys.length) {
    const PayloadType = payloadDto[keys[0]];
    changeClassName(PayloadType);

    class Payload extends PrevClass {
      @ApiProperty({
        type: PayloadType,
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      readonly [keys[0]];
    }
    changeClassName(Payload);

    keys.shift();
    return PipeInheritance(payloadDto, keys, Payload);
  }

  return PrevClass;
}

export function StandardResponseFactory(payloadDto: any): any {
  let Payload;
  let name: string;
  try {
    // Checks if `payloadDto` is object or is a class and can be instantiated
    // eslint-disable-next-line new-cap,no-new
    new payloadDto();
    Payload = payloadDto;
    name = payloadDto.name;
  } catch (err) {
    class Initial {}
    changeClassName(Initial);
    const keys = Object.keys(payloadDto);
    Payload = PipeInheritance(payloadDto, keys, Initial);
  }

  class StandardResponse extends StandardResponseDto {
    @ApiProperty({
      type: Payload,
    })
    readonly payload;
  }
  changeClassName(StandardResponse, name);

  return StandardResponse;
}
