'use strict';

var React = require('react-native');

var {
  AppRegistry,
  View
} = React;

var ToolbarAndroid = require('ToolbarAndroid');
var StatusBarAndroid = require('react-native-android-statusbar');
var ParkingList = require('./ParkingList');
var palette = require('google-material-color');

var styles = require('./styles');

StatusBarAndroid.setHexColor(palette.get('Teal', 700));

class ErwanReact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actionText: 'Example app with toolbar component',
      toolbarSwitch: false,
      colorProps: {
        titleColor: '#3b5998',
        subtitleColor: '#6a7180'
      },
      position: { // Place du commerce
        latitude: 47.2131707,
        longitude: -1.5606393
      }
    };
  }

  componentDidMount() {
    this._refreshPosition();
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
            actions={toolbarActions}
            navIcon={require('image!ic_menu_black_24dp')}
            onActionSelected={this._onActionSelected.bind(this)}
            onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
            style={styles.toolbar}
            subtitle={this.state.actionText}
            title="Toolbar" />
        <ParkingList
            position={this.state.position} />
      </View>
    );
  }

  _refreshPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position: position.coords});
        console.log("Now: ", position.coords);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  _onActionSelected(position) {
    if (toolbarActions[position].title === 'Refresh') {
      this._refreshPosition();
    };
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title
    });
  }

}

ErwanReact.statics = {
  title: 'Parking Finder',
  description: 'Parking Finder in Nantes.'
};


var toolbarActions = [
  {title: 'Map', icon: require('image!ic_map_black_48dp'), show: 'always'},
  {title: 'Refresh', icon: require('image!ic_refresh_black_48dp'), show: 'always'}
];

AppRegistry.registerComponent('parkingfinder', () => ErwanReact);
