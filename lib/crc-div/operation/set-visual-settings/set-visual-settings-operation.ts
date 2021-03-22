import { VisualBit, VisualBitSettings } from '../../structure/visual-bit';
import { InplaceOperationInterface, OperationEnum } from '../operation';

export interface SetVisualSettingsOperationData<SettingsType extends VisualBitSettings, ObjectType extends VisualBit<SettingsType>> {
  obj: ObjectType;
  settings?: SettingsType;
}

export class SetVisualSettingsOperation<SettingsType extends VisualBitSettings = VisualBitSettings, ObjectType extends VisualBit<SettingsType> = VisualBit<SettingsType>, DataType extends SetVisualSettingsOperationData<SettingsType, ObjectType> = SetVisualSettingsOperationData<SettingsType, ObjectType>> implements InplaceOperationInterface<DataType> {
  type: OperationEnum = OperationEnum.SET_VISUAL_SETTINGS;
  data: DataType;
  mergeSettings: boolean;

  constructor(data: DataType, mergeSettings?: boolean) {
    this.data = data;
    this.mergeSettings = mergeSettings || false;
  }

  execute(): boolean {
    this.data.obj.applySettings(this.data.settings, this.mergeSettings);
    return true;
  }
}