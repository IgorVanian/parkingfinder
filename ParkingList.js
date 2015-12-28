'use strict';

var React = require('react-native');
var styles = require('./styles');

var {
  View,
  ListView,
  TouchableHighlight,
  Text,
  PropTypes
} = React;

var ToolbarAndroid = require('ToolbarAndroid');

class MainView extends React.Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.parkings)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.parkings)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
            actions={this.props.toolbaractions}
            navIcon={require('image!ic_menu_black_24dp')}
            onActionSelected={this.props.onactionselected}
            onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
            style={styles.toolbar}
            subtitle={this.state.actionText}
            title="Toolbar" />
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
        />
      </View>
    );
  }

  _renderRow(rowData: object, sectionID: number, rowID: number) {
    let pStyle;
    switch (rowData.status) {
    case 'COMPLET':
      pStyle = styles.parkingFull;
      break;
    case 'FERME':
      pStyle = styles.parkingClosed;
      break;
    case 'ABONNES':
      pStyle = styles.parkingMembers;
      break;
    default:
      pStyle = styles.parkingFree;
    }
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.parkingItem}>
            <Text style={[styles.parkingMark, pStyle]}>P</Text>
            <View style={{flex: 1}}>
              <Text style={styles.parkingName}>{rowData.name}</Text>
              <Text style={styles.parkingAddress}>{rowData.address}</Text>
            </View>
            <Text style={styles.parkingStatus}>{rowData.status}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowID: number) {
/*    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});*/
  }

}

MainView.propTypes = {
  toolbaractions: PropTypes.array,
  onactionselected: PropTypes.func,
  parkings: PropTypes.array.isRequired,
  position: PropTypes.object.isRequired
};

module.exports = MainView;

