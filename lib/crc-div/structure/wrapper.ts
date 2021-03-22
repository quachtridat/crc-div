export class ScalarWrapper<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}

export class BooleanWrapper extends ScalarWrapper<boolean> {
  constructor(value?: boolean) {
    super(value || false);
  }
  toBoolean(): boolean {
    return this.value;
  }
}