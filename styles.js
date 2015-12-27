'use strict';

var _ = require('lodash');
var React = require('react-native');
var palette = require('google-material-color');

var {
  StyleSheet,
  PixelRatio
} = React;

var parkingMark = {
  fontSize: 22,
  padding: 15,
  textAlign: 'center',
  color: '#FFF'
};

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
  parkingFree: _.assign({
    backgroundColor: palette.get('Green', 500)
  }, parkingMark),
  parkingMembers: _.assign({
    backgroundColor: palette.get('Blue', 500)
  }, parkingMark),
  parkingClosed: _.assign({
    backgroundColor: palette.get('Red', 500)
  }, parkingMark),
  parkingFull: _.assign({
    backgroundColor: palette.get('Red', 500)
  }, parkingMark)
});

module.exports = styles;
