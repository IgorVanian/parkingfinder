'use strict';

var _ = require('lodash');
var React = require('react-native');

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
    backgroundColor: '#0F0'
  }, parkingMark),
  parkingMembers: _.assign({
    backgroundColor: '#00F'
  }, parkingMark),
  parkingClosed: _.assign({
    backgroundColor: '#0F0'
  }, parkingMark),
  parkingFull: _.assign({
    backgroundColor: '#F00'
  }, parkingMark)
});

module.exports = styles;
