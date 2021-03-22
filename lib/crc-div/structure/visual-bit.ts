import { BooleanWrapper } from './wrapper';

export interface VisualBitSettings {
  active?: boolean;
  hidden?: boolean;
}

export class VisualBit<SettingsType extends VisualBitSettings = VisualBitSettings> extends BooleanWrapper {
  settings?: SettingsType;

  constructor(value?: boolean, settings?: SettingsType) {
    super(value);
    this.settings = settings;
  }

  applySettings(settings?: SettingsType, merge = true): void {
    if (merge && this.settings && settings) {
      this.settings = {...this.settings, ...settings};
    } else this.settings = settings;
  }
}
