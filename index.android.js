'use strict';

var React = require('react-native');

var {
  AppRegistry,
  View,
  Navigator,
  PropTypes
} = React;

var ToolbarAndroid = require('ToolbarAndroid');
var StatusBarAndroid = require('react-native-android-statusbar');
var ParkingList = require('./ParkingList');
var ParkingMap = require('./ParkingMap');
var palette = require('google-material-color');

var nantes = require('./nantes');
var styles = require('./styles');

StatusBarAndroid.setHexColor(palette.get('Teal', 700));

var toolbarActions = [
  {title: 'Map', icon: require('image!ic_map_black_48dp'), show: 'always'},
  {title: 'Refresh', icon: require('image!ic_refresh_black_48dp'), show: 'always'}
];

class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actionText: 'Example app with toolbar component',
      toolbarSwitch: false,
      colorProps: {
        titleColor: '#3b5998',
        subtitleColor: '#6a7180'
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
            actions={toolbarActions}
            navIcon={require('image!ic_menu_black_24dp')}
            onActionSelected={this.props.onactionselected}
            onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
            style={styles.toolbar}
            subtitle={this.state.actionText}
            title="Toolbar" />
        <ParkingList
            parkings={this.props.parkings}
            position={this.props.position} />
      </View>
    );
  }

}

MainView.propTypes = {
  onactionselected: PropTypes.func,
  parkings: PropTypes.array.isRequired,
  position: PropTypes.object.isRequired
};

class ErwanReact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      parkings: [],
      position: { // Place du commerce
        latitude: 47.2131707,
        longitude: -1.5606393
      }
    };
  }

  render() {
    return (
        <Navigator
            initialRoute={{id: 'list'}}
            renderScene={this.renderScene.bind(this)}/>
    );
  }

  _refresh(position) {
    nantes.getParkings(position).then((parkings) => {
      this.setState({parkings: parkings});
    });
  }

  componentDidMount() {
    this._refresh(this.state.position);
    this._refreshPosition();
  }

  _refreshPosition(callback) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position: position.coords});
        if (callback) callback(position);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  onActionSelected(position, nav) {
    if (toolbarActions[position].title === 'Refresh') {
      this._refreshPosition();
    }
    if (toolbarActions[position].title === 'Map') {
      nav.push({id: 'map'});
    }
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title
    });
  }

  renderScene(route, nav) {
    switch (route.id) {
    case "map":
      return (
          <ParkingMap
        navigator={nav}
        position={this.state.position}
        parkings={this.state.parkings}
          />
      );
      break;
    default:
      return (
          <MainView
        navigator={nav}
        onactionselected={(position) => this.onActionSelected(position, nav)}
        position={this.state.position}
        parkings={this.state.parkings}
          />
      );
    }
  }
}

ErwanReact.statics = {
  title: 'Parking Finder',
  description: 'Parking Finder in Nantes.'
};


AppRegistry.registerComponent('parkingfinder', () => ErwanReact);
