import Dispatcher from '../Dispatcher';
import API from '../api/Api';
import {Store} from '../utils/StoreUtils';
import {KEYS as APP_KEYS} from '../constants/AppConstants';

export class AppStore extends Store {

  constructor(dispatcher) {
    super(dispatcher);
    this._app = {
      movies: [],
      isLoaded: false
    };
    this.handleMethods = {
      [APP_KEYS.FETCH_DATA_SUCCESS]: 'handleFetchDataSuccess',
      [APP_KEYS.INITIALIZE]: 'handleInitialize'
    };
  }

  /**
   * データを返す
   *
   * @return {Object}
   */
  getAll() {
    return this._app;
  }

  /**
   * 初期化
   */
  handleInitialize() {
    API.fetchData();
  }

  /**
   * データ取得完了
   *
   * @param {Object[]} movies movies data
   */
  handleFetchDataSuccess(movies) {
    this._app.movies = movies;
    this._app.isLoaded = true;
    this.emitChange();
  }

}

export default new AppStore(Dispatcher);
