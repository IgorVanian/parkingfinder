'use strict';

var React = require('react-native');
var BackAndroid = require('BackAndroid');

var {
  PropTypes
} = React;

var Mapbox = require('react-native-mapbox-gl');
var styles = require('./styles');

var mapRef = 'map';

var ParkingMap = React.createClass({
  mixins: [Mapbox.Mixin],
  propTypes: {
    position: PropTypes.object.isRequired,
    parkings: PropTypes.array,
    navigator: PropTypes.object
  },

  goBack: function() {
    this.props.navigator.pop();
    return true;
  },

  componentWillMount: function() {
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  },

  componentWillUnmount: function() {
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
  },

  _annotations: function() {
    const parkings = this.props.parkings || [];
    return parkings.map((parking) => {
      return {
        id: parking.id,
        coordinates: [parking.location.latitude, parking.location.longitude],
        type: 'point',
        title: parking.name,
        subtitle: parking.address
      };
    });
  },

  render: function() {
    return (
        <Mapbox
      accessToken={'pk.eyJ1IjoiZWxvaXNhbnQiLCJhIjoiY2lpcDQ3dHN5MDA2cHcwbTZrNWh2bmw2aCJ9.uvM77ecoNdm7y22OYWEFLQ'}
      centerCoordinate={this.props.position}
      annotations={this._annotations()}
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
      zoomLevel={12}
      compassIsHidden={false}
      onUserLocationChange={this.onUserLocationChange}
    />
);
  }

});

module.exports = ParkingMap;

