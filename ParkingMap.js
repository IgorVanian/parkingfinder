'use strict';

var React = require('react-native');

var Mapbox = require('react-native-mapbox-gl');
var styles = require('./styles');

var mapRef = 'map';

var ParkingMap = React.createClass({
  mixins: [Mapbox.Mixin],

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
        <Mapbox
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
  }

});

module.exports = ParkingMap;

