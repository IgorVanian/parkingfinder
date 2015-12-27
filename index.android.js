'use strict';

var React = require('react-native');

var {
  AppRegistry,
  View,
  Navigator
} = React;

var ToolbarAndroid = require('ToolbarAndroid');
var StatusBarAndroid = require('react-native-android-statusbar');
var Mapbox = require('react-native-mapbox-gl');
var ParkingList = require('./ParkingList');
var palette = require('google-material-color');

var styles = require('./styles');

var mapRef = 'map';

StatusBarAndroid.setHexColor(palette.get('Teal', 700));

class MainView extends React.Component {

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
    } else if (toolbarActions[position].title === 'Map') {
      this.props.navigator.push({id: 'map'});
    }
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title
    });
  }

}

var ErwanReact = React.createClass({
  mixins: [Mapbox.Mixin],
  statics: {
    title: 'Parking Finder',
    description: 'Parking Finder in Nantes.'
  },
  getInitialState: function() {
    return {
      position: { // Place du commerce
        latitude: 47.2131707,
        longitude: -1.5606393
      }
    };
  },
  render: function() {
    return (
        <Navigator
            initialRoute={{id: 'list'}}
            renderScene={this.renderScene}/>
    );
  },
  renderScene: function(route, nav) {
    switch (route.id) {
    case "map":
      return (
          <Mapbox
        navigator={nav}
        accessToken={'pk.eyJ1IjoiZWxvaXNhbnQiLCJhIjoiY2lpcDQ3dHN5MDA2cHcwbTZrNWh2bmw2aCJ9.uvM77ecoNdm7y22OYWEFLQ'}
        centerCoordinate={this.state.position}
        debugActive={false}
        direction={10}
        ref={mapRef}
        onRegionChange={this.onRegionChange}
        rotationEnabled={true}
        scrollEnabled={true}
        style={styles.map}
        showsUserLocation={true}
        styleUrl={this.mapStyles.emerald}
        userTrackingMode={this.userTrackingMode.none}
        zoomEnabled={true}
        zoomLevel={10}
        compassIsHidden={true}
        onUserLocationChange={this.onUserLocationChange}
          />
      );
      break;
    default:
      return <MainView navigator={nav}/>;
    }
  }
});

var toolbarActions = [
  {title: 'Map', icon: require('image!ic_map_black_48dp'), show: 'always'},
  {title: 'Refresh', icon: require('image!ic_refresh_black_48dp'), show: 'always'}
];

AppRegistry.registerComponent('parkingfinder', () => ErwanReact);
