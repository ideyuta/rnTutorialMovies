import Dispatcher from '../Dispatcher';
import {Action} from '../utils/ActionUtils';
import {KEYS} from '../constants/AppConstants';


/**
 * App 系 ActionCreator
 *
 */
export class AppAction extends Action {

  /**
   * 初期化
   */
  initialize() {
    this.dispatch(KEYS.INITIALIZE);
  }

  /**
   * データ取得完了
   *
   * @param {Object[]} movies movies data
   */
  handleFetchDataSuccess(movies) {
    this.dispatch(KEYS.FETCH_DATA_SUCCESS, movies);
  }

}

export default new AppAction(Dispatcher);
