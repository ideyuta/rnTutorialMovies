import {EventEmitter} from 'events';

/**
 * イベント識別子
 *
 * @type {string}
 */
const CHANGE_EVENT = 'change';


/**
 * 基底 Store
 *
 * プロジェクト内の Store はこれを継承して定義する。
 * constructor 内、もしくは static で handleMethods を定義すると
 * Action の種別に応じて指定の method を実行するようになる。
 *
 * @example
 * // ES7
 * class FooStore extends Store {
 *   static handleMethods = {
 *     KEYS.fooAction: 'doFoo'
 *   }
 *   doAction(action) {
 *     # do something
 *   }
 * }
 *
 * // ES6
 * class FooStore extends Store {
 *   constructor(dispatcher) {
 *     super(dispatcher);
 *     this.handleMethods = {
 *       KEYS.fooAction: 'doFoo'
 *     };
 *   }
 *   doAction(action) {
 *     # do something
 *   }
 * }
 */
export class Store extends EventEmitter {

  /**
   * Dispatcher の登録とアイテムの初期化
   *
   * @param {Dispatcher} dispatcher Dispatcher インスタンス
   */
  constructor(dispatcher) {
    super();
    this.dispatchToken = dispatcher.register(this.handleDispatch.bind(this));
    this._dispatcher = dispatcher;
    this._dependStores = [];
  }

  /**
   * 依存している Store を登録する
   *
   * @param {...Store} stores Store インスタンスの配列
   */
  registerDepends(...stores) {
    this._dependStores = stores;
  }

  /**
   * 登録済の依存ストアを返す
   *
   * @param {Store} storeCls 依存ストアクラス
   * @return {Store} 登録済依存ストアインスタンス
   */
  getDepend(storeCls) {
    for (const store of this._dependStores) {
      if (store instanceof storeCls && store.constructor === storeCls) {
        return store;
      }
    }
    throw new Error(`storeCls does not register: \`${storeCls}\``);
  }

  /**
   * リスナの登録
   *
   * @param {function(): void} callback コールバック関数
   */
  addChangeListener(callback) {
    this.addListener(CHANGE_EVENT, callback);
  }

  /**
   * リスナの削除
   *
   * @param {function(): void} callback コールバック関数
   */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /**
   * Change イベントの発火
   */
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * 各 Action についての処理ロジック
   *
   * @param {Symbol} type Action 種別
   * @param {Object} action Action 実体
   */
  handleDispatch({type, action}) {
    const method = this.handleMethods[type];
    if (method && this[method]) {
      this._dispatcher.waitFor(this._dependStores.map(store => {
        return store.dispatchToken;
      }));
      this[method](action);
    }
  }
}
