'use strict';

// TODO:
// center the spinner on listview
// round colored indicator
// parkings on map are not clickable
// Show info window after click on an item
// Error management: URL doesn't respond
// Proguard

import React from 'react-native';

var {
  AppRegistry,
  Navigator
} = React;

import StatusBarAndroid from 'react-native-android-statusbar';
import BackAndroid from 'BackAndroid';
import ParkingList from './ParkingList';
import ParkingMap from './ParkingMap';
import ParkingDetails from './ParkingDetails';
import palette from 'google-material-color';

import nantes from './nantes';

StatusBarAndroid.setHexColor(palette.get('Light Blue', 700));

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var toolbarActions = [
  {title: 'Map', icon: require('image!ic_map_black_48dp'), show: 'always'},
  {title: 'Refresh', icon: require('image!ic_refresh_black_48dp'), show: 'always'}
];

class ParkingFinder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      parkings: [],
      loading: false,
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
    this.setState({loading: true}, () => {
      nantes.getParkings(position).then((parkings) => {
        this.setState({parkings: parkings, loading: false});
      });
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
    _navigator = nav;
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
    case "details":
      return (
          <ParkingDetails parking={route.parking} />
      );
    default:
      return (
          <ParkingList
        navigator={nav}
        loading={this.state.loading}
        toolbaractions={toolbarActions}
        onactionselected={(position) => this.onActionSelected(position, nav)}
        position={this.state.position}
        parkings={this.state.parkings}
          />
      );
    }
  }
}

ParkingFinder.statics = {
  title: 'Parking Finder',
  description: 'Parking Finder in Nantes.'
};


AppRegistry.registerComponent('parkingfinder', () => ParkingFinder);
