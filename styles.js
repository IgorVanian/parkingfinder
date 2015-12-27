'use strict';

var React = require('react-native');
var palette = require('google-material-color');

var {
  StyleSheet,
  PixelRatio
} = React;

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: palette.get('Amber', 500),
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
    fontSize: 22,
    paddingTop: 15,
    paddingBottom: 15
  },
  parkingStatus: {
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 15
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb'
  },
  parkingMark: {
    fontSize: 22,
    padding: 15,
    borderRadius: 15,
    textAlign: 'center',
    color: '#FFF'
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
