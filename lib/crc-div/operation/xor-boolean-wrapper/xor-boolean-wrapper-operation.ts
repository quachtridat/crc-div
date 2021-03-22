import { BooleanWrapper } from '../../structure/wrapper';
import { OperationEnum, OperationInterface } from '../operation';

export interface XorBooleanWrapperOperationData<T1 extends BooleanWrapper, T2 extends BooleanWrapper> {
  value1: T1;
  value2: T2;
}

export class XorBooleanWrapperOperation<T1 extends BooleanWrapper, T2 extends BooleanWrapper>
  implements
    OperationInterface<XorBooleanWrapperOperationData<T1, T2>, BooleanWrapper> {
  type: OperationEnum = OperationEnum.XOR_BOOLEAN_WRAPPER;
  data: XorBooleanWrapperOperationData<T1, T2>;

  constructor(data: XorBooleanWrapperOperationData<T1, T2>) {
    this.data = data;
  }

  execute(): BooleanWrapper {
    return {
      value: this.data.value1.value !== this.data.value2.value,
    } as BooleanWrapper;
  }
}
