import { OperationEnum, OperationInterface } from '../operation';

export class NewArrayOperation<ArrayType> implements OperationInterface<ArrayType, ArrayType> {
  type: OperationEnum = OperationEnum.NEW_ARRAY;
  data: ArrayType;

  constructor(data: ArrayType) {
    this.data = data;
  }

  execute(): ArrayType {
    return this.data;
  }
}