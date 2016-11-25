
export const LocationService =  {

  getCurrentLocation(callBack: Function) {

    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos: Position): PositionCallback {
      var crd: Coordinates = pos.coords;

      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');
      callBack(crd);
      return;
    }

    function error(err: PositionError): PositionErrorCallback  {
      console.warn('ERROR(' + err.code + '): ' + err.message);
      return;
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

  }
};



