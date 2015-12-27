'use strict';

var React = require('react-native');

var {
  StyleSheet,
  PixelRatio
} = React;

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56
  },
  container: {
    flex: 1
  },
  parkingItem: {
    flexDirection: 'row'
  },
  parkingName: {
    flex: 1,
    fontSize: 24
  },
  parkingStatus: {
    fontSize: 18
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb'
  }
});

module.exports = styles;
