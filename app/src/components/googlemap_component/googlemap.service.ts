import {GoogleMapLoaderService} from '../common/google_maps_loader.service';


export class GoogleMapService {

  // api-key AIzaSyDdauxpzXTyktNa8x97awm9_3X-3pycINA

  // lat: string = '52.4383235';
  // lng: string = '31.0015138';

  lat: string = '0.0';
  lng: string = '0.0';
  zoom: string = '1';

  key: string = 'AIzaSyDdauxpzXTyktNa8x97awm9_3X-3pycINA';

  googleMapObj: google.maps.Map;

  markerArray: IGoogleMapService.IMarkerPoint[];

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

  setMarkers(markerSetArray: IGoogleMapService.IMarkerPoint[]){
    this.markerArray = markerSetArray;
    markerSetArray.forEach((value: IGoogleMapService.IMarkerPoint, index: number, array: IGoogleMapService.IMarkerPoint[]) => {
      let marker = new google.maps.Marker({
        position: {lat: value.lat, lng: value.lng},
        map: this.googleMapObj,
        title: value.text
      });
    })
  }

  initMap() {
    GoogleMapLoaderService.load({key: this.key}).then((googleMaps: any) => {
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
