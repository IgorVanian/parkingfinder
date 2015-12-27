'use strict';

var _ = require('lodash');
var React = require('react-native');
var GiftedListView = require('react-native-gifted-listview');
var styles = require('./styles');

var {
  View,
  ListView,
  TouchableHighlight,
  Text,
  PropTypes
} = React;


/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};


var ParkingList = React.createClass({
  propTypes: {
    sourceUrl: PropTypes.string.isRequired
  },
  getDefaultProps() {
    return {
      sourceUrl: "http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json"
    };
  },
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      actionText: 'Example app with toolbar component',
      toolbarSwitch: false,
      dataSource: ds.cloneWithRows([]),
      colorProps: {
        titleColor: '#3b5998',
        subtitleColor: '#6a7180'
      }
    };
  },
  _onFetch: function(page = 1, callback, options) {
    console.log("Do fetch");
    fetch(this.props.sourceUrl)
      .then((response) => response.json())
      .then((json) => {
        var parking = json.opendata.answer.data.Groupes_Parking.Groupe_Parking;
        console.log("got ", parking);
        // this.setState({dataSource: this.state.dataSource.cloneWithRows(parking)});
        callback(parking, {allLoaded: true});
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();
  },
  render: function() {
    return (
      <GiftedListView
        onFetch={this._onFetch}
        rowView={this._renderRow}
      />
    );
  },
  _renderRow: function(rowData: object, sectionID: number, rowID: number) {
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
  },

  _pressRow: function(rowID: number) {
/*    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});*/
  }

});

module.exports = ParkingList;

