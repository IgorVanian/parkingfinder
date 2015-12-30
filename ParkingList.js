'use strict';

var React = require('react-native');
var ProgressBar = require('ProgressBarAndroid');
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
            onActionSelected={this.props.onactionselected}
            onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
            style={styles.toolbar}
            subtitle="Nantes"
            title="Parking Finder" />
        { this.props.loading && <ProgressBar indeterminate={true}/> }
        { !this.props.loading &&
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            />
        }
      </View>
    );
  }

  _renderRow(rowData: object, sectionID: number, rowID: number) {
    let pStyle;
    switch (rowData.status) {
    case 'C':
      pStyle = styles.parkingFull;
      break;
    case 'F':
      pStyle = styles.parkingClosed;
      break;
    case 'A':
      pStyle = styles.parkingMembers;
      break;
    default:
      pStyle = styles.parkingFree;
    }
    if (this.props.loading) {
      return (
          <ProgressBar indeterminate={true}/>
      );
    } else {
      return (
        <TouchableHighlight onPress={() => this._pressRow(rowID)}>
          <View>
            <View style={styles.parkingItem}>
              <View style={{flex: 1}}>
                <Text style={styles.parkingName}>{rowData.name}</Text>
                <Text style={styles.parkingAddress}>{rowData.address}</Text>
              </View>
              <View style={[styles.parkingStatus, pStyle]}><Text style={styles.parkingStatusText}>{rowData.status}</Text></View>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      );
    }
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
  loading: PropTypes.bool,
  parkings: PropTypes.array.isRequired,
  position: PropTypes.object.isRequired
};

module.exports = MainView;

