import React from 'react-native';
import {Image, ListView, StyleSheet, Text, View} from 'react-native';
import AppStore from './stores/AppStore';
import AppAction from './actions/AppAction';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
});


export default class rnTutorialMovies extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoaded: false,
      movieData: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
    AppStore.addChangeListener(this._onChange);
    AppAction.initialize();
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  /**
   * 各種 Store を監視して state を更新する
   */
  _onChange = () => {
    this.setState(this.getStateFromStore());
  }

  /**
   * 各種 Store から state に必要な情報を取得、整形して返す
   *
   * @return {Object}
   */
  getStateFromStore() {
    const app = AppStore.getAll();
    return {
      isLoaded: app.isLoaded,
      movieData: this.state.movieData.cloneWithRows(app.movies)
    };
  }

  /**
   * ローディングのレンダリング
   *
   * @return {ReactElement}
   */
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  }

  /**
   * アイテムのレンダリング
   *
   * @param {Object} movie movie data
   * @return {ReactElement}
   */
  renderMovieItem(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }

  /**
   * レンダリング
   *
   * @return {ReactElement}
   */
  render() {
    if (!this.state.isLoaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.movieData}
        renderRow={this.renderMovieItem}
        style={styles.listView}
      />
    );
  }
}
