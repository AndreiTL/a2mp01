import loadGoogleMapsAPI from 'load-google-maps-api';
// import * as loadGoogleMapsAPI from 'load-google-maps-api/index.js';

export class GoogleMapService {

  // api-key AIzaSyDdauxpzXTyktNa8x97awm9_3X-3pycINA

  // lat: string = '52.4383235';
  // lng: string = '31.0015138';

  lat: string = '0.0';
  lng: string = '0.0';
  zoom: string = '1';

  key: string = 'AIzaSyDdauxpzXTyktNa8x97awm9_3X-3pycINA';

  googleMapObj: google.maps.Map;

  innerBlock: string = `<div id="googlemap"></div>`;
  constructor(){
    this.initMap();
  }

  setMapCenterAndZoom(lat: number, lng: number, zoom: number){
    let mapOptions: google.maps.MapOptions = {
      center: {
        lat: lat,
        lng: lng
      },
      zoom: zoom
    };
    this.googleMapObj.setOptions(mapOptions);
  }

  initMap() {
    loadGoogleMapsAPI({key: this.key}).then((googleMaps: any) => {
      this.googleMapObj = new googleMaps.Map(document.getElementById('googlemap'), {
        center: {lat: parseFloat(this.lat), lng: parseFloat(this.lng)},
        zoom: parseInt(this.zoom)
      });

    }).catch((err: Object) => {
      console.error(err);
      alert('Cann\'t load google map!');
    });
  }

  getInner (){
    return this.innerBlock;
  }

}
