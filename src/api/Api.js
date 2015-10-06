import AppAction from '../actions/AppAction';


/**
 * API
 */
export class API {

  constructor() {
    const API_KEY = '7waqfqbprs7pajbz28mqf6vz';
    const API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
    const PAGE_SIZE = 25;
    const PARAMS = `?apikey=${API_KEY}&page_limit=${PAGE_SIZE}`;
    this.REQUEST_URL = `${API_URL}${PARAMS}`;
  }

  /**
   * データ取得
   */
  fetchData() {
    fetch(this.REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        AppAction.handleFetchDataSuccess(responseData.movies);
      })
      .done();
  }

}

export default new API();
