'use strict';

var React = require('react-native');
var BackAndroid = require('BackAndroid');

var {
  PropTypes,
  View,
  Text
} = React;

var styles = require('./styles');

var ParkingDetails = React.createClass({
  propTypes: {
    parking: PropTypes.object.isRequired
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

  render: function() {
    return (
        <View>
        <Text>{this.props.parking.name}</Text>
        </View>
    );
  }

});

module.exports = ParkingDetails;
