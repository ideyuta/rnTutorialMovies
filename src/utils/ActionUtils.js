/**
 * 基盤 ActionCreator
 *
 * プロジェクト内の ActionCreator はこれを継承して実装する。
 * Dispatcher をインスタンス変数として保持、利用する実装になっている。
 */
export class Action {
  /**
   * Dipatcher を取り込んで初期化する
   *
   * @param {Dispatcher} dispatcher Disptacher インスタンス
   */
  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  /**
   * Action の発行
   *
   * @param {Symbol} type アクション種別
   * @param {Object} action アクション実体
   */
  dispatch(type, action) {
    this.dispatcher.dispatch({type, action});
  }
}
