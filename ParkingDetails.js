'use strict';

import React from 'react-native';
const {
  PropTypes,
  View,
  Text
} = React;

const ParkingDetails = (props) => (
  <View>
    <Text>{props.parking.name}</Text>
  </View>
);

ParkingDetails.propTypes = {
  parking: PropTypes.object.isRequired
};

export default ParkingDetails;

