'use strict';

var _ = require('lodash');
var React = require('react-native');
var styles = require('./styles');
var nantes = require('./nantes');

var {
  View,
  ListView,
  TouchableHighlight,
  Text,
  PropTypes
} = React;

class ParkingList extends React.Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      lastPosition: 'unknown'
    };
  }

  _refresh(position) {
    nantes.getParkings(position).then((parkings) => {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(parkings)});
    });
  }

  componentWillReceiveProps(nextProps) {
    this._refresh(nextProps.position);
  }

  componentDidMount() {
    this._refresh(this.props.position);
  }

  render() {
    return (
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this._renderRow.bind(this)}
      />
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

ParkingList.propTypes = {
  position: PropTypes.object
};


module.exports = ParkingList;

