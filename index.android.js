'use strict';

var React = require('react-native');

var {
  AppRegistry,
  View
} = React;

var ToolbarAndroid = require('ToolbarAndroid');
var ParkingList = require('./ParkingList');

var url_nantes = "http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json";

var styles = require('./styles');

class ErwanReact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actionText: 'Example app with toolbar component',
      toolbarSwitch: false,
      colorProps: {
        titleColor: '#3b5998',
        subtitleColor: '#6a7180'
      }
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
            actions={toolbarActions}
            navIcon={require('image!ic_menu_black_24dp')}
            onActionSelected={this._onActionSelected.bind(this)}
            onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
            style={styles.toolbar}
            subtitle={this.state.actionText}
            title="Toolbar" />
        <ParkingList sourceUrl={url_nantes} />
      </View>
    );
  }

  _onActionSelected(position) {
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title
    });
  }

}

ErwanReact.statics = {
  title: 'Parking Finder',
  description: 'Parking Finder in Nantes.'
};


var toolbarActions = [
  {title: 'Map', icon: require('image!ic_map_black_48dp'), show: 'always'},
  {title: 'Refresh', icon: require('image!ic_refresh_black_48dp'), show: 'always'}
];

AppRegistry.registerComponent('parkingfinder', () => ErwanReact);
