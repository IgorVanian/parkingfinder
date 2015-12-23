'use strict';

var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  View
} = React;

var ToolbarAndroid = require('ToolbarAndroid');
var ParkingList = require('./ParkingList');

var url_nantes = "http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json";


var ErwanReact = React.createClass({
  statics: {
    title: '<ToolbarAndroid>',
    description: 'Examples of using the Android toolbar.'
  },
  getInitialState: function() {
    return {
      actionText: 'Example app with toolbar component',
      toolbarSwitch: false,
      colorProps: {
        titleColor: '#3b5998',
        subtitleColor: '#6a7180'
      }
    };
  },
  render: function() {
    return (
      <View>
          <ToolbarAndroid
            actions={toolbarActions}
            navIcon={require('image!ic_menu_black_24dp')}
            onActionSelected={this._onActionSelected}
            onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
            style={styles.toolbar}
            subtitle={this.state.actionText}
            title="Toolbar" />
          <ParkingList
            sourceUrl={url_nantes}
          />
      </View>
    );
  },
  _onActionSelected: function (position) {
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title
    });
  }

});

var toolbarActions = [
  {title: 'Create', icon: require('image!ic_create_black_48dp'), show: 'always'},
  {title: 'Filter'},
  {title: 'Settings', icon: require('image!ic_settings_black_48dp'), show: 'always'},
];

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  }
});

AppRegistry.registerComponent('tatayoyo', () => ErwanReact);
