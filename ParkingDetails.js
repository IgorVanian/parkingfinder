'use strict';

import React from 'react-native';

var {
  PropTypes,
  View,
  Text
} = React;

var ParkingDetails = (props) => (
  <View>
    <Text>{props.parking.name}</Text>
  </View>
);

ParkingDetails.propTypes = {
  parking: PropTypes.object.isRequired
};

module.exports = ParkingDetails;

