'use strict';

import React from 'react-native';

const {
  PropTypes
} = React;

import Mapbox from 'react-native-mapbox-gl';
import styles from './styles';

const mapRef = 'map';

const ParkingMap = React.createClass({
  mixins: [Mapbox.Mixin],
  propTypes: {
    position: PropTypes.object.isRequired,
    parkings: PropTypes.array
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

export default ParkingMap;

