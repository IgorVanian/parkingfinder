'use strict';

var React = require('react-native');
var palette = require('google-material-color');

var {
  StyleSheet,
  PixelRatio
} = React;

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: palette.get('Light Blue', 400),
    height: 56
  },
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  parkingItem: {
    marginLeft: 10,
    flexDirection: 'row'
  },
  parkingName: {
    fontSize: 22,
    paddingTop: 15
  },
  parkingStatus: {
    backgroundColor: palette.get('Green', 500),
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 10,
    paddingTop: 10
  },
  parkingStatusText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFF'
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb'
  },
  parkingFree: {
    backgroundColor: palette.get('Green', 500)
  },
  parkingMembers: {
    backgroundColor: palette.get('Blue', 500)
  },
  parkingClosed: {
    backgroundColor: palette.get('Red', 500)
  },
  parkingFull: {
    backgroundColor: palette.get('Red', 500)
  }
});

module.exports = styles;
