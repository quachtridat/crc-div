export enum OperationEnum {
  APPEND_ARRAY_INPLACE = 'APPEND_ARRAY_INPLACE',
  DELETE_ARRAY_RANGE = 'DELETE_ARRAY_RANGE',
  NEW_ARRAY = 'NEW_ARRAY',
  SELECT = 'SELECT',
  SET_LEADING_SPACES = 'SET_LEADING_SPACES',
  SET_RESULT_ARRAY = 'SET_RESULT_ARRAY',
  SET_VISUAL_SETTINGS = 'SET_VISUAL_SETTINGS',
  XOR_BOOLEAN_WRAPPER = 'XOR_BOOLEAN_WRAPPER',
  XOR_NUMBER = 'XOR_NUMBER',
}

export interface InplaceOperationInterface<DataType> {
  type: OperationEnum;
  data: DataType;
  execute: () => boolean;
}

export interface OperationInterface<DataType, ReturnType> {
  type: OperationEnum;
  data: DataType;
  execute: () => ReturnType;
}
