/*

A modified version of:

Queue.js

A function to represent a queue

Created by Kate Morley - http://code.iamkate.com/ - and released under the terms
of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

import { NoSuchElementException } from './errors';

const NO_SUCH_ELEMENT_ERROR_MSG = 'The queue has no such element!';

export interface QueueInterface<T> {
  queue: Array<T>;
  offset: number;
}

/**
 * A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
export class Queue<T> implements QueueInterface<T> {
  queue: Array<T>;
  offset: number;

  /** Creates a new queue.
   */
  constructor() {
    // initialise the queue and offset
    this.queue = [] as T[];
    this.offset = 0;
  }

  /**
   * @returns {number} the length of the queue.
   */
  length(): number {
    return this.queue.length - this.offset;
  }

  /**
   * @returns {boolean} true if the queue is empty, and false otherwise.
   */
  isEmpty(): boolean {
    return this.queue.length == 0;
  }

  /** Enqueues the specified item.
   * @param {T} item - the item to enqueue
   */
  enqueue(item: T): void {
    this.queue.push(item);
  }

  /** Dequeues an item and returns it.
   * @throws {NoSuchElementException} when the queue is empty.
   */
  dequeue(): T {
    if (this.isEmpty())
      throw new NoSuchElementException(NO_SUCH_ELEMENT_ERROR_MSG);

    // store the item at the front of the queue
    const item = this.queue[this.offset];

    // increment the offset and remove the free space if necessary
    if (++this.offset * 2 >= this.queue.length) {
      this.queue = this.queue.slice(this.offset);
      this.offset = 0;
    }

    // return the dequeued item
    return item;
  }

  /** Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  poll(): T | undefined {
    // if the queue is empty, return immediately
    if (this.isEmpty()) return undefined;

    return this.dequeue();
  }

  /**
   * Returns the item at the front of the queue (without dequeuing it).
   * @throws {NoSuchElementException} when the queue is empty.
   */
  element(): T {
    if (this.isEmpty())
      throw new NoSuchElementException(NO_SUCH_ELEMENT_ERROR_MSG);
    return this.queue[this.offset];
  }

  /** Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then 'undefined' is returned.
   */
  peek(): T | undefined {
    return !this.isEmpty() ? this.queue[this.offset] : undefined;
  }

  toArray(): T[] {
    return this.queue.slice(this.offset);
  }
}

export default Queue;
