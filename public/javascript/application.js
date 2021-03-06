/* globals google */
function initMap() {

  // various markers and their properties
  var locations = {
    home: { position: {lat: 48.469, lng: -123.367}, title: "Welcome home, Jenn & Garrett", info: "Home at last in wonderful Victoria" },
    aussie: { position: {lat: -25.363, lng: 131.044}, title: "Whee I am in Australia!" },
    moonUnderWater: { position: {lat: 48.438, lng: -123.376}, title: "Moon Under Water Pub" },
    kickboxing: { position: {lat: 48.493, lng: -123.388}, title: "30 Minute Hit", info: "NINJA HIIIIIYA!" },
    beach: { position: {lat: 48.521, lng: -123.366}, title: "My favourite beach.. Cordova" },
    swanLake: { position: {lat: 48.463, lng: -123.373}, title: "Swan Lake near my place" }
  };

  // plots map
  var map = new google.maps.Map(document.getElementById('map'), { zoom: 12 });

  // creating each marker
  function makeMarker(markerSpec) {
    var marker = new google.maps.Marker({position: markerSpec.position, title: markerSpec.title, map: map, draggable: true, animation: google.maps.Animation.DROP});
    // sets up info window. 'if' statement b/c not all markers have info windows
    if(markerSpec.info) {
      var infoWindow = new google.maps.InfoWindow({
        content: markerSpec.info, 
        maxWidth: 300
      });
      // opens window when clicked on (API 'listens' for click)
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
    }
    return marker;
  }

  // loops through and creates each marker
  Object.keys(locations).forEach(function(place) {
    var location = locations[place];
    var marker = makeMarker(location);
    location.marker = marker;
  });

  // sets which marker is @ centre (here it is the home marker)
  map.setCenter(locations.home.position);

  // animation for markers when page is refreshed
  function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }
}


/* TODO:  - implement this legend/checkboxes https://developers.google.com/fusiontables/docs/samples/in?hl=en
          - maybe colour each marker differently
          - add geolocation (show user where they are on the map)
          - https://developers.google.com/maps/documentation/javascript/examples/map-geolocation */
