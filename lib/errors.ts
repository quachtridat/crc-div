import { nameof } from './utils';

export class InvalidArgumentException extends Error {
  name = `${nameof({InvalidArgumentException})}`;
  arg?: string;

  constructor(message?: string, arg?: string) {
    super(message);
    this.arg = arg;
  }
}

export class NoSuchElementException extends Error { 
  name = `${nameof({NoSuchElementException})}`;
  constructor(message?: string) {
    super(message);
  }
}

export class NotImplementedException extends Error {
  name = `${nameof({NotImplementedException})}`;
  constructor(message?: string) {
    super(message);
  }
}