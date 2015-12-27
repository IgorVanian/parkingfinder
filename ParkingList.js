'use strict';

var _ = require('lodash');
var React = require('react-native');
var styles = require('./styles');
var equipements = require('./equipements');
var haversine = require('haversine');

var {
  View,
  ListView,
  TouchableHighlight,
  Text,
  PropTypes
} = React;

var url_nantes = "http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json";
var parkingLocations = _(equipements.data).filter((elt) => (elt.CATEGORIE === 1001 || elt.CATEGORIE === 1005)).indexBy('_IDOBJ').value();

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
    fetch(url_nantes)
      .then((response) => response.json())
      .then((json) => {
        var parking = json.opendata.answer.data.Groupes_Parking.Groupe_Parking.map((item) => {
          if (parkingLocations[item.IdObj]) {
            item.location = {
              latitude: parkingLocations[item.IdObj]._l[0],
              longitude: parkingLocations[item.IdObj]._l[1]
            };
            item.distance = haversine(position, item.location);
            item.address = parkingLocations[item.IdObj].ADRESSE;
          }
          return item;
        });
        parking.sort((p1, p2) => p1.distance - p2.distance);
        this.setState({dataSource: this.state.dataSource.cloneWithRows(parking)});
      })
      .catch((error) => {
        console.warn(error);
      }).done();
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
    var name = _.capitalize(rowData.Grp_nom.toLowerCase());
    var address = rowData.address;
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
              <View style={{flex: 1}}>
              <Text style={styles.parkingName}>{name}</Text>
              <Text style={styles.parkingAddress}>{address}</Text>
            </View>
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
  position: PropTypes.object
};


module.exports = ParkingList;

