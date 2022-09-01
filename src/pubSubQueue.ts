/*
 * Simple suscribable generic queue
 * supports only one suscriber
 */

type PubSubQueueCallback<T> = (newHead: T | null) => void;

type KeyExtractor<T> = (i: T) => string;

export class PubSubQueue<T> {
  private _items: T[] = [];
  private _callback: PubSubQueueCallback<T> | undefined;
  private _keyExtractor: KeyExtractor<T>;

  constructor(keyExtractor: KeyExtractor<T>) {
    this._keyExtractor = keyExtractor;
  }

  private _updateCallback = () => {
    this._callback && this._callback(this._items[0] ?? null);
  };

  /**
   * Suscribes to notifications. Will receive notifications when
   * the head of the queue changes
   * @param callback Callback function
   */
  public suscribe = (callback: PubSubQueueCallback<T>) => {
    this._callback = callback;
    this._updateCallback();
  };

  /**
   * Inserts an item at the back of the queue
   * @param newItem Item to insert
   */
  public push = (newItem: T) => {
    this._items = [...this._items, newItem];
    if (this._items.length === 1) this._updateCallback();
  };

  /**
   * Returns the element at head and crops the queue removing such element
   * @returns The formed head item
   */
  public popHead = (): T | undefined => {
    const head = this._items[0];
    this._items = this._items.slice(1);
    this._updateCallback();
    return head;
  };

  /**
   * Removes an item from the queue
   * Will notify suscribers only if the item removed was at the head
   * @param key Key of the item to remove
   */
  public removeByKey = (key: string) => {
    const ix = this._items.findIndex((i) => this._keyExtractor(i) === key);

    if (ix !== -1) {
      this._items = this._items.filter((i) => this._keyExtractor(i) !== key);

      if (ix === 0) this._updateCallback();
    }
  };

  /**
   * Removes an item from the queue
   * Will notify suscribers only if the item replaced was at the head
   * @param key Key of the item to remove
   * @param newItem Item to set
   */
  public replaceByKey = (key: string, newItem: T) => {
    const foundIx = this._items.findIndex((i) => this._keyExtractor(i) === key);

    if (foundIx !== -1) {
      this._items = this._items.map((i, ix) => (ix === foundIx ? newItem : i));

      if (foundIx === 0) this._updateCallback();
    }
  };

  /**
   * Gets the head element if any
   * @returns The head element
   */
  public getHead = (): T | undefined => this._items[0];

  /**
   * Replace all items of the queue with given items
   * @param items Items to set in replacement
   */
  public replace = (items: T[]) => {
    if (items.length === 0) return;
    if (this._items.length === 0) return;

    this._items = [...items];
    this._updateCallback();
  };
}
