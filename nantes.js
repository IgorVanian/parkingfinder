'use strict';

import _ from 'lodash';
import haversine from 'haversine';
import equipements from './equipements';

const url_nantes = "http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json";
const parkingLocations = _(equipements.data)
        .filter((elt) => (elt.CATEGORIE === 1001 || elt.CATEGORIE === 1005))
        .indexBy('_IDOBJ')
        .value();

export const getParkings = function(position) {
  return fetch(url_nantes)
    .then((response) => response.json())
    .then((json) => {
      let parkings = json.opendata.answer.data.Groupes_Parking.Groupe_Parking.map((item) => {
        const location = {
          latitude: parkingLocations[item.IdObj]._l[0],
          longitude: parkingLocations[item.IdObj]._l[1]
        };
        const distance = haversine(position, location);
        const dispo = parseInt(item.Grp_disponible, 10);
        const complet = parseInt(item.Grp_complet, 10);
        let status;
        if (item.Grp_statut === '0') {
          status = '';
        } else if (item.Grp_statut === '1') {
          status = 'F';
        } else if (item.Grp_statut === '2') {
          status = 'A';
        } else if (dispo < complet) {
          status = 'C';
        } else {
          status = item.Grp_disponible;
        }
        return {
          id: item.IdObj,
          name: _.capitalize(item.Grp_nom.toLowerCase()),
          address: parkingLocations[item.IdObj].ADRESSE,
          location: location,
          distance: distance,
          status: status
        };
      });
      parkings.sort((p1, p2) => p1.distance - p2.distance);
      return parkings;
    })
    .catch((error) => {
      console.warn("Error fetching parkings", error);
    });
};

