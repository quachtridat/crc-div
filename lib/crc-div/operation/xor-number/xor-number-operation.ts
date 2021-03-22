import { OperationEnum, OperationInterface } from '../operation';

export class XorNumberOperationData {
  value1: number;
  value2: number;

  constructor(val1: number, val2: number) {
    this.value1 = val1;
    this.value2 = val2;
  }
}

export class XorNumberOperation implements OperationInterface<XorNumberOperationData, number> {
  type: OperationEnum = OperationEnum.XOR_NUMBER;
  data: XorNumberOperationData;

  constructor(data: XorNumberOperationData) {
    this.data = data;
  }

  execute(): number {
    return this.data.value1 ^ this.data.value2;
  }
}