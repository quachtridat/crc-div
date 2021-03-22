import { OperationEnum, InplaceOperationInterface } from '../operation';

export class AppendArrayInplaceOperationData<ItemType, ContainerType extends Array<ItemType>> {
  items: ItemType[];
  container: ContainerType;

  constructor(container: ContainerType, ...items: ItemType[]) {
    this.items = items;
    this.container = container;
  }
}

export class AppendArrayInplaceOperation<ItemType = any, ContainerType extends Array<ItemType> = Array<ItemType>> implements InplaceOperationInterface<AppendArrayInplaceOperationData<ItemType, ContainerType>> {
  type: OperationEnum = OperationEnum.APPEND_ARRAY_INPLACE;
  data: AppendArrayInplaceOperationData<ItemType, ContainerType>;

  constructor(data: AppendArrayInplaceOperationData<ItemType, ContainerType>) {
    this.data = data;
  }

  execute(): boolean {
    this.data.container.push(...this.data.items);
    return true;
  }
}