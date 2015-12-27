'use strict';

var _ = require('lodash');
var React = require('react-native');
var styles = require('./styles');
var equipements = require('./equipements');

var {
  View,
  ListView,
  TouchableHighlight,
  Text,
  PropTypes
} = React;

var parkingLocations = _(equipements.data).filter((elt) => elt.CATEGORIE === 1001).indexBy('_IDOBJ').value();

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

class ParkingList extends React.Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      lastPosition: 'unknown'
    };
  }

  _refreshPosition(callback) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
        if (callback) callback(initialPosition);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  componentDidMount() {
    this._refreshPosition();
    fetch(this.props.sourceUrl)
      .then((response) => response.json())
      .then((json) => {
        var parking = json.opendata.answer.data.Groupes_Parking.Groupe_Parking.map((item) => {
          item.location = parkingLocations[item.IdObj] && parkingLocations[item.IdObj]._l;
          return item;
        });
        this.setState({dataSource: this.state.dataSource.cloneWithRows(parking)});
      })
      .catch((error) => {
        console.warn(error);
      }).done();
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
    var rowHash = Math.abs(hashCode(rowData));
    var name = _.capitalize(rowData.Grp_nom.toLowerCase());
    var dispo = parseInt(rowData.Grp_disponible, 10);
    var complet = parseInt(rowData.Grp_complet, 10);
    var affichage;
    var pStyle = styles.parkingFree;
    if (rowData.Grp_statut === '0') {
      affichage = '';
    } else if (rowData.Grp_statut === '1') {
      affichage = 'FERME';
      pStyle = styles.parkingClosed;
    } else if (rowData.Grp_statut === '2') {
      affichage = 'ABONNES';
      pStyle = styles.parkingMembers;
    } else if (dispo < complet) {
      affichage = 'COMPLET';
      pStyle = styles.parkingFull;
    } else {
      affichage = rowData.Grp_disponible;
    }
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.parkingItem}>
            <Text style={[styles.parkingMark, pStyle]}>P</Text>
            <Text style={styles.parkingName}>{name}</Text>
            <Text style={styles.parkingStatus}>{affichage}</Text>
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
  sourceUrl: PropTypes.string.isRequired
};


module.exports = ParkingList;

